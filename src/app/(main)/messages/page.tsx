import Chat from "@/app/(main)/_components/messages/chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin nhắn",
};

export default function MessagesPage() {
  return <Chat />;
}
