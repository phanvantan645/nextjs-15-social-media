import Chat from "@/app/(main)/_components/messages/chat";
import { routes } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.messages.title,
};

export default function MessagesPage() {
  return <Chat />;
}
