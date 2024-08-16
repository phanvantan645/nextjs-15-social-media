import FollowingFeed from "@/app/(main)/_components/following-feed";
import ForYouFeed from "@/app/(main)/_components/for-you-feed";
import PostEditor from "@/app/(main)/_components/posts/editor/post-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendsSidebar from "@/components/ui/trends-sidebar";

export default async function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList className="flex h-14 w-full justify-between gap-3 rounded-2xl bg-card p-1">
            <TabsTrigger
              value="for-you"
              className="h-full w-1/2 rounded-2xl bg-card text-center"
            >
              Thịnh hành
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="h-full w-1/2 rounded-2xl bg-card text-center"
            >
              Đang theo dõi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
