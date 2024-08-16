"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { MessageCountInfo } from "@/lib/types";
import { routes } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Bell, Mail } from "lucide-react";
import Link from "next/link";

interface MessageButtonProps {
  initialState: MessageCountInfo;
}

export default function MessageButton({ initialState }: MessageButtonProps) {
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () =>
      kyInstance.get("/api/messages/unread-count").json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title={routes.messages.title}
      asChild
    >
      <Link href={routes.messages.path}>
        <div className="relative">
          <Mail />
          {!!data?.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">{routes.messages.title}</span>
      </Link>
    </Button>
  );
}
