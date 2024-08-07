"use client";

import { Input } from "@/components/ui/input";
import { MoveLeft, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function SearchField() {
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef(null);
  const [hiddenForm, setHiddenForm] = useState<boolean>(true);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };
  const handleSearchButton = () => {
    if (hiddenForm === true) {
      setHiddenForm(false);
      mobileSearchRef.current?.focus();
    } else setHiddenForm(true);
  };
  return (
    <>
      <button
        className={`rounded-full bg-secondary p-2 ${hiddenForm ? "block" : "hidden"} md:hidden`}
        onClick={handleSearchButton}
      >
        <SearchIcon className="size-5" />
      </button>
      <form onSubmit={handleSubmit} method="GET" action="/search">
        <div className="relative hidden md:block">
          <Input name="q" placeholder="Tìm kiếm" className="pe-28" />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
        </div>
      </form>
      {/* mobile search */}
      <form action="/search" method="GET" className="md:hidden">
        <div
          className={`fixed left-2 right-2 z-50 ${hiddenForm ? "-top-full" : "top-4"} md:hidden`}
        >
          <Input
            ref={mobileSearchRef}
            name="q"
            placeholder="Tìm kiếm"
            className="pe-28 pl-10 outline-none focus:outline-none"
          />
          <MoveLeft
            onClick={handleSearchButton}
            className="absolute left-3 top-1/2 size-5 -translate-y-1/2 transform cursor-pointer text-muted-foreground"
          />
          {/* <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" /> */}
        </div>
      </form>
      <div
        className={`fixed cursor-pointer ${hiddenForm ? "-z-10" : "bottom-0 left-0 right-0 top-0 z-40"}`}
        onClick={handleSearchButton}
      ></div>
    </>
  );
}

export default SearchField;
