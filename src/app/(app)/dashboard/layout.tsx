import SideItemsList from "@/components/side-items-list";
import React from "react";
type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="grid grid-cols-3 grid-rows-1 h-[700px]">
      <div className="col-span-1 col-start-1 border-r border-gray-500/10">
        <div className="w-full h-full">
          <SideItemsList />
        </div>
      </div>
      {children}
    </main>
  );
}
