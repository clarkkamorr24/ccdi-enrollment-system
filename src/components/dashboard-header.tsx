import React from "react";
import LogoWhite from "./logo-white";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col items-center justify-center w-full h-[70px] bg-ccdi-blue/90 text-white ">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto w-full px-4 xl:px-0">
        <LogoWhite />
        <div className="flex gap-x-4">
          <p>Welcome user</p>
          <Link href="/">
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
