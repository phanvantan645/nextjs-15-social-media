import { validateRequest } from "@/auth";
import { routes } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect(routes.home.path);

  return <>{children}</>;
}
