import AttendanceTable from "@/components/attendance";
import H1 from "@/components/h1";
import Teachers from "@/components/teachers";
import WeeklyRecordTable from "@/components/weekly-record";
import React from "react";
import { getStudents } from "@/actions/action";
import { checkAuth } from "@/lib/server-utils";
import NoResultFound from "@/components/no-result-found";

export default async function Page({ params }: { params: { route: string } }) {
  const session = await checkAuth();
  const students = await getStudents(session.user.id);

  console.log(!students.length);
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
      {params.route === "list-of-teachers" && (
        <>
          <Title> List of Teachers</Title>

          <Teachers />
        </>
      )}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <H1 className="uppercase text-center mb-5 text-ccdi-blue font-semibold py-2">
      {children}
    </H1>
  );
}
