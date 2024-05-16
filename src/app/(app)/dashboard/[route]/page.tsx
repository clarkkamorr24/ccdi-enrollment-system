import AttendanceTable from "@/components/attendance";
import H1 from "@/components/h1";
import SubjectsTable from "@/components/subject";
import WeeklyRecordTable from "@/components/weekly-record";
import { checkAuth } from "@/lib/server-utils";
import IconWithModal from "@/components/icon-with-modal";

export default async function Page({ params }: { params: { route: string } }) {
  const session = await checkAuth();

  return (
    <div className=" md:col-span-full md:col-start-2 p-4">
      {params.route === "attendance" && (
        <div className="relative">
          <Title>
            <IconWithModal modalType="student" />
            List of Students
          </Title>

          <AttendanceTable />
        </div>
      )}
      {params.route === "attendance-weekly-record" && (
        <>
          <Title> Attendance Weekly Record</Title>
          <WeeklyRecordTable />
        </>
      )}
      {params.route === "list-of-subjects" && (
        <div className="relative">
          <Title>
            List of Subjects
            <IconWithModal modalType="subject" />
          </Title>
          <SubjectsTable />
        </div>
      )}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <H1 className="flex justify-center uppercase text-center mb-5 text-ccdi-blue font-semibold py-2 items-center">
      {children}
    </H1>
  );
}
