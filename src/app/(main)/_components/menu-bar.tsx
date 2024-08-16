import MessageButton from "@/app/(main)/_components/messages/message-button";
import NotificationButton from "@/app/(main)/_components/notifications/notification-button";
import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();
  if (!user) return null;

  const [unreadNotificationCount, unreadMessageCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Trang chủ"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Trang chủ</span>
        </Link>
      </Button>
      <NotificationButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <MessageButton initialState={{ unreadCount: unreadMessageCount }} />

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Dấu trang"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Dấu trang</span>
        </Link>
      </Button>
    </div>
  );
}

export default MenuBar;
