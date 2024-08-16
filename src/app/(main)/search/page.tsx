import SearchResult from "@/app/(main)/_components/search/search-result";
import TrendsSidebar from "@/components/ui/trends-sidebar";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export function generateMetadata({
  searchParams: { q },
}: SearchPageProps): Metadata {
  return {
    title: `Kết quả tìm kiếm cho: "${q}"`,
  };
}

export default function SearchPage({ searchParams: { q } }: SearchPageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            Kết quả tìm kiếm cho: &quot;{q}&quot;
          </h1>
        </div>
        <SearchResult query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
