import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  formatDate,
  formatDistanceToNowStrict,
  setDefaultOptions,
} from "date-fns";
import { vi } from "date-fns/locale";
setDefaultOptions({ locale: vi });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, {
      addSuffix: true,
    });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "dd MMM");
    } else {
      return formatDate(from, "dd MMM yyyy");
    }
  }
}

export function formatNumber(number: number): String {
  return new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const routes = {
  home: { path: "/", title: "Trang chủ" },
  notifications: { path: "/notifications", title: "Thông báo" },
  messages: { path: "/messages", title: "Tin nhắn" },
  bookmarks: { path: "/bookmarks", title: "Dấu trang" },
  users: { path: "/users", title: "Người dùng" },
  posts: { path: "/posts", title: "Bài viết" },
  search: { path: "/search", title: "Tìm kiếm" },
  login: { path: "/login", title: "Đăng nhập" },
  signup: { path: "/signup", title: "Đăng ký" },
};

export const appName = "handbook";
export const appDescription = "Được thục hiện bởi Văn Tấn";
