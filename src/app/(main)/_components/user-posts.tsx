"use client";

import Post from "@/app/(main)/_components/posts/post";
import PostsLoadingSkeleton from "@/app/(main)/_components/posts/posts-loading-skeleton";
import InfiniteScrollContainer from "@/components/ui/infinite-scroll-container";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UserPostsProps {
  userId: string;
}

function UserPosts({ userId }: UserPostsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/users/${userId}/posts`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        Người dùng chưa đăng bài viết nào!
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        Có lỗi xảy ra trong quá trình xử lý.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
    >
      {posts && posts.map((post) => <Post key={post?.id} post={post} />)}
      {isFetchingNextPage && <PostsLoadingSkeleton />}
      {/* <DeletePostDialog open={true} onClose={() => {}} post={posts[0]} /> */}
    </InfiniteScrollContainer>
  );
}

export default UserPosts;
