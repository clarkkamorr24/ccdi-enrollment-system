import DashboardHeader from "@/components/dashboard-header";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/90 h-screen">
      <DashboardHeader />
      <div className="flex flex-col justify-center max-w-[1050px] mx-auto px-4 bg-white h-[600px] rounded-md mt-10">
        {children}
      </div>
    </div>
  );
}
