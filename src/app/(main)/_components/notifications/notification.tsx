import UserAvatar from "@/components/ui/user-avatar";
import { NotificationData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";

interface NotificationsProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationsProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: any; href: string }
  > = {
    FOLLOW: {
      message: `đang theo dõi bạn.`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.isUser?.username}`,
    },
    COMMENT: {
      message: `đã bình luận bài viết của bạn:`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `đã thích bài viết của bạn:`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.isUser?.avatarUrl} />
          <div>
            <span className="font-bold">{notification.isUser.displayName}</span>{" "}
            <span> {message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
