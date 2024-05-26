import Logo from "@/components/logo";
import AuthContextProvider from "@/contexts/auth-context-provider";
import { auth } from "@/lib/auth-no-edge";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col max-w-md mx-auto justify-center items-center min-h-screen px-4">
      <main className="flex flex-col justify-center items-center bg-white w-full py-5 rounded-md">
        <Link href="/">
          <Logo />
        </Link>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster position="top-right" />
      </main>
    </div>
  );
}
