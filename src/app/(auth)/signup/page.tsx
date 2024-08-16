import { Metadata } from "next";
import signUpImage from "@/assets/signup-image.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/app/(auth)/signup/signup-form";

export const metadata: Metadata = {
  title: "Đăng ký",
};

export default function SignupPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">
              Đăng ký vào{" "}
              <span className="font-bold italic text-primary">handbook</span>
            </h1>
            <p className="text-muted-foreground">
              Là nơi <span className="italic">bạn</span> có thể tìm kiếm và kết
              bạn
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Đã có tài khoản? Đăng nhập ngay
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
