import React from "react";
import LogoWhite from "./logo-white";
import Link from "next/link";
import LogoutBtn from "./logout-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function DashboardHeader() {
  const session = await checkAuth();
  const { email } = session.user;

  return (
    <header className="flex flex-col items-center justify-center w-full h-[70px] bg-ccdi-blue/90 text-white ">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto w-full px-4 xl:px-0">
        <Link href="/dashboard">
          <LogoWhite />
        </Link>
        <div className="flex gap-x-1 items-center">
          Hello, {email}
          <span className="animate-wave mr-4">👋</span>
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}
