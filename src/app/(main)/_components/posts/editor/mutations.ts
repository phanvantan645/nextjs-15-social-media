import { submitPost } from "@/app/(main)/_components/posts/editor/actions";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/session-provider";
import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onError: () => {
      toast({
        variant: "destructive",
        description: "Đăng bài thất bại! Vui lòng thử lại sau",
      });
    },
    onSuccess: async (newPost) => {
      const queryFilters = {
        queryKey: ["post-feed"],
        predicate: (query) =>
          query.queryKey.includes("for-you") ||
          (query.queryKey.includes("user-posts") &&
            query.queryKey.includes(user.id)),
      } satisfies QueryFilters;
      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilters,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData?.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData?.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilters.queryKey,
        predicate: (query) =>
          queryFilters.predicate(query) && !query.state.data,
      });

      toast({
        description: "Đăng bài thành công",
      });
    },
  });
  return mutation;
}
