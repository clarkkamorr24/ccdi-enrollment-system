"use client";

import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import { sideItems } from "@/utils/link";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideItemsList() {
  const pathname = usePathname();
  const time = useClock();
  return (
    <ul>
      {sideItems.map((sideITem) => (
        <Link href={`${sideITem.href}`} key={sideITem.id}>
          <li
            className={cn(
              "flex py-4 justify-center items-center w-full border-b border-ccdi-blue/10 transition hover:bg-ccdi-blue/50 hover:text-white",
              pathname === sideITem.href ? "bg-ccdi-blue/80 text-white" : ""
            )}
          >
            {sideITem.name}
          </li>
        </Link>
      ))}
      {/* <p className="text-2xl text-white text-center mt-10 bg-ccdi-blue/80 py-2 mx-10 rounded-md">
        Time: {time.toLocaleTimeString()}
      </p> */}
    </ul>
  );
}
