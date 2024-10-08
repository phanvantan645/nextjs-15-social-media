import SearchField from "@/app/(main)/_components/search-field";
import UserButton from "@/components/ui/user-button";
import { appName, routes } from "@/lib/utils";
import Link from "next/link";

function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link
          href={routes.home.path}
          className="text-2xl font-bold text-primary"
        >
          {appName}
        </Link>
        <SearchField />
        <UserButton className="ms-auto" />
      </div>
    </header>
  );
}

export default NavBar;
