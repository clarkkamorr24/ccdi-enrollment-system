import DashboardHeader from "@/components/dashboard-header";
import DateHeader from "@/components/date-header";
import { ClientSessionProvider } from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientSessionProvider>
        <div className="bg-white/90 min-h-screen">
          <DashboardHeader />
          <DateHeader />
          <div className="max-w-[1050px] mx-auto bg-white mt-2 rounded-md">
            {children}
          </div>
          <Toaster position="top-right" />
        </div>
      </ClientSessionProvider>
    </>
  );
}
