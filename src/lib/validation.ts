import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const signupSchema = z.object({
  email: requiredString.email("Email must be a valid email"),
  username: requiredString.regex(
    /^[a-zA-Z0-9]+$/,
    "Username must only contain letters and numbers, - and _ allow",
  ),
  password: requiredString.min(8, "Password must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});
