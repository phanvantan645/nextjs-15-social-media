import { z } from "zod";

const requiredString = z.string().trim().min(1, "Không được để trống");

export const signupSchema = z.object({
  email: requiredString.email("Không định dạng được email"),
  username: requiredString.regex(
    /^[a-zA-Z0-9]+$/,
    "Tải khoản phải bằng chữ, số và chấp nhận - với _",
  ),
  password: requiredString.min(8, "Mật khẩu ít nhất 8 ký tụ trở lên"),
});

export type SignUpValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "Không thể tải quá 5 tệp đính kèm"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Chỉ có thể dùng 1000 ký tụ"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
