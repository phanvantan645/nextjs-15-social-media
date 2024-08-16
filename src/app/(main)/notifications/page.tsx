import Notifications from "@/app/(main)/_components/notifications/notifications";
import TrendsSidebar from "@/components/ui/trends-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông báo",
};

export default function NotificationsPage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Thông báo</h1>
        </div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
}
