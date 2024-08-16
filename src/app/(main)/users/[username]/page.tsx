import EditProfileButton from "@/app/(main)/_components/edit-profile-button";
import FollowerCount from "@/app/(main)/_components/follower-count";
import UserPosts from "@/app/(main)/_components/user-posts";
import { validateRequest } from "@/auth";
import FollowButton from "@/components/ui/follow-button";
import Linkify from "@/components/ui/linkify";
import TrendsSidebar from "@/components/ui/trends-sidebar";
import UserAvatar from "@/components/ui/user-avatar";
import prisma from "@/lib/prisma";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) return notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUserId } = await validateRequest();

  if (!loggedInUserId) return {};
  const user = await getUser(username, loggedInUserId.id);
  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

async function UserPage({ params: { username } }: PageProps) {
  const { user: loggedInUserId } = await validateRequest();

  if (!loggedInUserId)
    return (
      <p className="text-center text-destructive">
        Vui lòng đăng nhập để xem nọi dung này!
      </p>
    );

  const user = await getUser(username, loggedInUserId.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUserId.id} />
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-2xl">
            Bài viết của{" "}
            <span className="font-bold underline">{user.displayName}</span>
          </h2>
        </div>
        <UserPosts userId={user.id} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
export default UserPage;

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followeInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      (follower) => follower.followerId === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
        hasPreview
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="text-muted-foreground">{user.username}</div>
          </div>
          <div>Tham gia ngày : {formatDate(user.createdAt, "dd-MMM-yyyy")}</div>
          <div className="flex items-center gap-3">
            <span>
              Bài viết:{" "}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>
            <FollowerCount userId={user.id} initialState={followeInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followeInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr className="my-5" />
          <Linkify>
            <div className="overflow-hidden whitespace-pre-line break-words">
              {user.bio}
            </div>
          </Linkify>
        </>
      )}
    </div>
  );
}
