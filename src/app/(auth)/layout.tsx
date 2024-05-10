import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-xl mx-auto justify-center items-center min-h-screen">
      <main className="flex flex-col justify-center items-center bg-white w-full py-10 rounded-md">
        {children}
      </main>
    </div>
  );
}
