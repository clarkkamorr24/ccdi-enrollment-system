import {
  getAttendanceRecord,
  getStudents,
  getSubjects,
} from "@/actions/action";
import SideItemsList from "@/components/side-items-list";
import AttendanceContextProvider from "@/contexts/attendance-context-provider";
import StudentContextProvider from "@/contexts/student-context-provider";
import SubjectContextProvider from "@/contexts/subject-context-provider";
import { checkAuth } from "@/lib/server-utils";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await checkAuth();
  const records = await getAttendanceRecord(session.user.id);
  // const records = await getRecords();
  const subjects = await getSubjects(session.user.id);
  const students = await getStudents(session.user.id);

  return (
    <main className="grid md:grid-cols-3 md:grid-rows-1 md:h-[700px]">
      <div className="md:col-span-1 md:col-start-1 border-r border-gray-500/10">
        <div className="md:w-full md:h-full p-2">
          <SideItemsList />
        </div>
      </div>
      <StudentContextProvider data={students}>
        <SubjectContextProvider data={subjects}>
          <AttendanceContextProvider data={records}>
            {children}
          </AttendanceContextProvider>
        </SubjectContextProvider>
      </StudentContextProvider>
    </main>
  );
}
