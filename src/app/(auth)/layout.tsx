import Logo from "@/components/logo";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-md mx-auto justify-center items-center min-h-screen px-4">
      <main className="flex flex-col justify-center items-center bg-white w-full py-5 rounded-md">
        <Logo />
        {children}
      </main>
    </div>
  );
}
