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
