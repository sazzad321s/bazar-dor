import { Suspense } from "react";
import ActiveNavlink from "./ActiveNavlink";
import Link from "next/link";
interface Icategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const categories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Data Fetching Failed");
  }

  return res.json();
};

const Navlinks = async () => {
  const category: Icategory[] = await categories();

  return (
    <nav className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl overflow-x-auto px-3 sm:px-4">
        <div className="flex w-max min-w-full items-center gap-3 py-1 sm:gap-5">
          {category.map((c) => (
  <Suspense
    key={c.slug}
    fallback={
      <Link
        href={`/category/${c.slug}`}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
      >
        <span>{c.icon}</span>
        <span>{c.nameBn}</span>
      </Link>
    }
  >
    <ActiveNavlink category={c} />
  </Suspense>
))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
