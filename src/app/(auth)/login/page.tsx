import { Metadata } from "next";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/(auth)/login/login-form";
import GoogleSigninButton from "@/app/(auth)/login/google-sigin-button";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">
              Đăng nhập vào{" "}
              <span className="font-bold italic text-primary">handbook</span>
            </h1>
            <p className="text-muted-foreground">
              Là nơi <span className="italic">bạn</span> có thể tìm kiếm và kết
              bạn
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted-foreground" />
              <p className="text-center text-muted-foreground">Hoặc</p>
              <div className="h-px flex-1 bg-muted-foreground" />
            </div>
            <div>
              <GoogleSigninButton />
            </div>
            <Link href="/signup" className="block text-center hover:underline">
              Chưa có tài khoản? Đăng ký ngay
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
