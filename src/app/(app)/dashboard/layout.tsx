import SideItemsList from "@/components/side-items-list";
import AttendanceContextProvider from "@/contexts/attendance-context-provider";
import { getRecords } from "@/utils/getRecords";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const records = await getRecords();

  return (
    <main className="grid grid-cols-3 grid-rows-1 h-[700px]">
      <div className="col-span-1 col-start-1 border-r border-gray-500/10">
        <div className="w-full h-full p-2">
          <SideItemsList />
        </div>
      </div>
      <AttendanceContextProvider data={records}>
        {children}
      </AttendanceContextProvider>
    </main>
  );
}
