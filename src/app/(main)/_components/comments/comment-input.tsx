import { useSubmitCommentMutation } from "@/app/(main)/_components/comments/mutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostData } from "@/lib/types";
import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";

interface CommentInputProps {
  post: PostData;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [input, setInput] = useState("");

  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;
    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <Input
        placeholder="Hãy để lại bình luận..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        disabled={!input.trim() || mutation.isPending}
        size={"icon"}
        variant={"ghost"}
      >
        {mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <SendHorizonal />
        )}
      </Button>
    </form>
  );
}
