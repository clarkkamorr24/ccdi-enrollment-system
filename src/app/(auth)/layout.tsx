import Logo from "@/components/logo";
import { checkDashboardAuth } from "@/lib/server-utils";
import Link from "next/link";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkDashboardAuth();

  return (
    <div className="flex flex-col max-w-md mx-auto justify-center items-center min-h-screen px-4">
      <main className="flex flex-col justify-center items-center bg-white w-full py-5 rounded-md">
        <Link href="/">
          <Logo />
        </Link>

        {children}
      </main>
    </div>
  );
}
