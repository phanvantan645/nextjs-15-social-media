"use client";

import UserTooltip from "@/components/ui/user-tooltip";
import kyInstance from "@/lib/ky";
import { UserData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import Link from "next/link";

interface UserLinkWithTooltipProps extends React.PropsWithChildren {
  username: string;
}

function UserLinkWithTooltip({ username, children }: UserLinkWithTooltipProps) {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return false;
      }

      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <span
      >
        {children}
      </span>
    );
  }

  return (
    <UserTooltip user={data}>
      <Link
        href={`/users/${username}`}
        className="text-primary hover:underline"
      >
        {children}
      </Link>
    </UserTooltip>
  );
}

export default UserLinkWithTooltip;
