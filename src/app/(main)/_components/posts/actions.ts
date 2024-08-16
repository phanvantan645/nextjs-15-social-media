"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Lỗi xác thực!");

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) throw new Error("Không tìm thấy bài viết");

  if (post.userId !== user.id) throw new Error("Lỗi xác thực!");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletedPost;
}
