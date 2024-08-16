import MainLayout from "@/app/(main)/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="my-12 w-full space-y-3 text-center">
        <h1 className="text-3xl font-bold">404 - Không tìm thấy</h1>
        <span>Đường dẫn không khả dụng! Vui lòng chon đường dẫn khác</span>
        <br />
        <span>Hoặc</span>
        <br />
        <Button>
          <Link href="/">Quay lại trang chủ</Link>
        </Button>
      </div>
    </MainLayout>
  );
}
