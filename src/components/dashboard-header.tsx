import React from "react";
import LogoWhite from "./logo-white";
import Link from "next/link";
import LogoutBtn from "./logout-btn";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col items-center justify-center w-full h-[70px] bg-ccdi-blue/90 text-white ">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto w-full px-4 xl:px-0">
        <Link href="/dashboard">
          <LogoWhite />
        </Link>
        <div className="flex gap-x-4 items-center">
          <p>Welcome Admin</p>

          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}
