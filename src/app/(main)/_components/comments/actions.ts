"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

export async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) {
    throw Error("Lỗi xác thực!");
  }

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),
    ...(post.user.id !== user.id
      ? [
          prisma.notification.create({
            data: {
              isUserId: post.user.id,
              recipientId: user.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Lỗi xác thực!");

  const comment = await prisma.comment.findUnique({ where: { id } });

  if (!comment) throw new Error("Không có comment nào!");

  if (comment.userId !== user.id) throw new Error("Lỗi xác thực!");

  const commentData = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });
  return commentData;
}
