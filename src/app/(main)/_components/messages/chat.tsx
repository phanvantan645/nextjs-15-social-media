"use client";

import ChatChannel from "@/app/(main)/_components/messages/chat-channel";
import ChatSidebar from "@/app/(main)/_components/messages/chat-sidebar";
import useInitializeChatClient from "@/app/(main)/messages/useInitializeChatClient";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";

export default function Chat() {
  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) return <Loader2 className="mx-auto animate-spin" />;

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat_theme-dark"
              : "str-chat_theme-light"
          }
        >
          <ChatSidebar
            open={!sidebarOpen}
            onClose={() => setSidebarOpen(true)}
          />
          <ChatChannel
            open={sidebarOpen}
            onpenSidebar={() => setSidebarOpen(false)}
          />
        </StreamChat>
      </div>
    </main>
  );
}
