import {
  deleteComment,
  submitComment,
} from "@/app/(main)/_components/comments/actions";
import { useToast } from "@/components/ui/use-toast";
import kyInstance from "@/lib/ky";
import { CommentData, CommentsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData?.pageParams,
              pages: [
                {
                  comments: [newComment, ...firstPage.comments],
                  previousCursor: firstPage.previousCursor,
                },
                ...oldData?.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate: (query) => !query.state.data,
      });

      toast({
        description: "Bình luận thành công",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Bình luận thất bại! Vui lòng thử lại.",
      });
    },
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (commentData) => {
      const queryKey: QueryKey = ["comments", commentData.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData?.pageParams,
              pages: oldData.pages.map((page) => ({
                comments: page.comments.filter((c) => c.id !== commentData.id),
                previousCursor: page.previousCursor,
              })),
            };
          }
        },
      );
      toast({
        description: "Xóa bình luận thành công",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Xóa bình luận thất bại! Vui lòng thử lại.",
      });
    },
  });

  return mutation;
}
