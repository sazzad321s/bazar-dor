
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Icategory {
  slug: string;
  nameBn: string;
  icon: string;
}

const ActiveNavlink = ({ category }: { category: Icategory }) => {
  const pathname = usePathname();
  const isActive = pathname === `/category/${category.slug}`;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-green-700 text-white"
          : "text-gray-700 hover:bg-green-50"
      }`}
    >
      <span>{category.icon}</span>
      <span>{category.nameBn}</span>
    </Link>
  );
};

export default ActiveNavlink;
