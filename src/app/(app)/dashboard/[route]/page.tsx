import AttendanceTable from "@/components/attendance";
import H1 from "@/components/h1";
import SubjectsTable from "@/components/subject";
import WeeklyRecordTable from "@/components/weekly-record";
import { getStudents, getSubjects } from "@/actions/action";
import { checkAuth } from "@/lib/server-utils";
import NoResultFound from "@/components/no-result-found";
import { SubjectsModal } from "@/components/subjects-modal";

export default async function Page({ params }: { params: { route: string } }) {
  const session = await checkAuth();
  const students = await getStudents(session.user.id);

  return (
    <div className=" md:col-span-full md:col-start-2 p-4">
      {params.route === "attendance" && (
        <>
          <Title> List of Students</Title>
          {!students.length && <NoResultFound />}
          {students.length > 0 && <AttendanceTable students={students} />}
        </>
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
            <SubjectsModal />
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
