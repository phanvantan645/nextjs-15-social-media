"use client";

import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
import { useState } from "react";
import UserAvatarPreviewDialog from "@/app/(main)/_components/user-avatar-preview-dialog";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
  hasPreview?: boolean;
}

function UserAvatar({
  avatarUrl,
  size,
  className,
  hasPreview = true,
}: UserAvatarProps) {
  const [isShowImage, setIsShowImage] = useState(false);

  return (
    <>
      <Image
        src={avatarUrl || avatarPlaceholder}
        alt="Avatar"
        width={size ?? 48}
        height={size ?? 48}
        className={cn(
          `aspect-square h-fit flex-none rounded-full bg-secondary object-cover`,
          className,
          hasPreview ? "cursor-pointer" : "",
        )}
        onClick={hasPreview ? () => setIsShowImage(true) : undefined}
      />
      <UserAvatarPreviewDialog
        src={avatarUrl || avatarPlaceholder}
        open={isShowImage}
        onOpenChange={setIsShowImage}
      />
    </>
  );
}

export default UserAvatar;
