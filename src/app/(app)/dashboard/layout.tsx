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

  const [ records, subjects, students] = await Promise.all([
    await getAttendanceRecord(session.user.id),
    await getSubjects(session.user.id),
    await getStudents(session.user.id),
  ]);

  return (
    <main className="grid md:h-[700px] md:grid-cols-4 md:grid-rows-1">
      <div className="border-r border-gray-500/10 md:col-span-1 md:col-start-1">
        <div className="p-2 md:h-full md:w-full">
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
