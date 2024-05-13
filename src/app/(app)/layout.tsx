import DashboardHeader from "@/components/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth } from "@/lib/server-utils";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  console.log("AppLayoutsession", session);

  return (
    <>
      <div className="bg-white/90 min-h-screen">
        <DashboardHeader />
        <div className="max-w-[1050px] mx-auto bg-white mt-10">{children}</div>
        <Toaster position="top-right" />
      </div>
    </>
  );
}
