"use client";

import { cn } from "@/lib/utils";
import { sideItems } from "@/utils/link";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideItemsList() {
  const pathname = usePathname();

  return (
    <ul>
      {sideItems.map((sideITem) => (
        <Link href={`${sideITem.href}`} key={sideITem.id}>
          <li
            className={cn(
              "flex py-3 text-sm justify-center mb-1 items-center w-full transition hover:bg-ccdi-blue/80 hover:text-white rounded-md",
              pathname === sideITem.href ? "bg-ccdi-blue/80 text-white" : ""
            )}
          >
            {sideITem.name}
          </li>
          <div className="h-[1px] bg-ccdi-blue/10 w-full" />
        </Link>
      ))}
    </ul>
  );
}
