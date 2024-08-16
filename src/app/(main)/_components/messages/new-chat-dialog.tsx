"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/ui/user-avatar";
import useDebounce from "@/hooks/useDebounce";
import { useSession } from "@/lib/session-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { channel } from "diagnostics_channel";
import { CheckIcon, Loader2, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";

interface NewChatDialogProps {
  onOpenChange: (open: boolean) => void;
  onChatCreated: () => void;
}

export default function NewChatDialog({
  onOpenChange,
  onChatCreated,
}: NewChatDialogProps) {
  const { client, setActiveChannel } = useChatContext();

  const { toast } = useToast();

  const { user: loggedInUser } = useSession();

  const [searchInput, setSearchInput] = useState("");

  const searchInputDebounced = useDebounce(searchInput);

  const [seletedUser, setSeletedUser] = useState<
    UserResponse<DefaultStreamChatGenerics>[]
  >([]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["stream-users", searchInputDebounced],
    queryFn: async () =>
      client.queryUsers(
        {
          id: { $ne: loggedInUser?.id },
          role: { $ne: "admin" },
          ...(searchInputDebounced
            ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { username: { $autocomplete: searchInputDebounced } },
                ],
              }
            : {}),
        },
        { name: 1, username: 1 },
        { limit: 15 },
      ),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const channel = client.channel("messaging", {
        members: [loggedInUser.id, ...seletedUser.map((u) => u.id)],
        name:
          seletedUser.length > 1
            ? loggedInUser.displayName +
              ", " +
              seletedUser.map((u) => u.displayName).join(", ")
            : undefined,
      });
      await channel.create();
      return channel;
    },
    onSuccess: (channel) => {
      setActiveChannel(channel);
      onChatCreated();
    },
    onError: (error) => {
      console.error("Error creating channel", error);
      toast({
        variant: "destructive",
        description: "Xử lý thất bại! Vui lòng thử lại",
      });
    },
  });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="bg-card p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Tạo tin nhắn mới</DialogTitle>
        </DialogHeader>
        <div>
          <div className="group relative">
            <SearchIcon className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
            <input
              placeholder="Bạn tìm ai?"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              className="h-12 w-full pe-4 ps-14 focus:outline-none"
            />
          </div>
          {!!seletedUser.length && (
            <div className="mt-4 flex flex-wrap gap-4 p-2">
              {seletedUser.map((user) => (
                <SeletedUserTag
                  key={user.id}
                  user={user}
                  onRemove={() => {
                    setSeletedUser((prev) =>
                      prev.filter((u) => u.id !== user.id),
                    );
                  }}
                />
              ))}
            </div>
          )}
          <hr />
          <div className="h-96 overflow-y-auto">
            {isSuccess &&
              data.users.map((user) => (
                <UserResult
                  key={user.id}
                  user={user}
                  seleted={seletedUser.some((u) => u.id === user.id)}
                  onClick={() => {
                    setSeletedUser((prev) => {
                      return prev.some((u) => u.id === user.id)
                        ? prev.filter((u) => u.id !== user.id)
                        : [...prev, user];
                    });
                  }}
                />
              ))}
            {isSuccess && !data.users.length && (
              <p className="my-3 text-center text-muted-foreground">
                Không tìm thấy người dùng. Vui lòng thử lại với tên khác
              </p>
            )}
            {isFetching && <Loader2 className="mx-auto my-3 animate-spin" />}
            {isError && (
              <p className="my-3 text-center text-destructive">
                Có lỗi xảy ra vui lòng thử lại.
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="px-6 pb-6">
          <LoadingButton
            disabled={!seletedUser.length}
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Tạo tin nhắn mới
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UserResultProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  seleted: boolean;
  onClick: () => void;
}

function UserResult({ user, seleted, onClick }: UserResultProps) {
  return (
    <button
      className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/50"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <UserAvatar avatarUrl={user.image} />
        <div className="flex flex-col text-start">
          <p className="font-bold">{user.name}</p>
          <p className="text-muted-foreground">{user.username}</p>
        </div>
      </div>
      {seleted && <CheckIcon className="size-5 text-green-500" />}
    </button>
  );
}

interface SeletedUserTagProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  onRemove: () => void;
}

function SeletedUserTag({ user, onRemove }: SeletedUserTagProps) {
  return (
    <button
      className="flex items-center gap-2 rounded-full border p-1 hover:bg-muted/50"
      onClick={onRemove}
    >
      <UserAvatar avatarUrl={user.image} />
      <p className="font-bold">{user.name}</p>
      <X className="mx-2 size-5 text-muted-foreground" />
    </button>
  );
}
