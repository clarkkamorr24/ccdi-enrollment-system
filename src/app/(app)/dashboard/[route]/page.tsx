import Attendance from "@/components/attendance";
import H1 from "@/components/h1";
import Teachers from "@/components/teachers";
import WeeklyRecord from "@/components/weekly-record";
import React from "react";
import { useGetRangeOfTheWeek } from "@/hooks/useGetRangeOfTheWeek";
import { getStudents } from "@/actions/action";

export default async function Page({ params }: { params: { route: string } }) {
  const students = await getStudents();
  const { endOfWeekFormatted, startOfWeekFormatted } = useGetRangeOfTheWeek();

  return (
    <div className=" col-span-full col-start-2 p-4">
      {params.route === "attendance" && (
        <>
          <Title> List of Students</Title>
          <Attendance students={students} />
        </>
      )}
      {params.route === "attendance-weekly-record" && (
        <>
          <Title> Attendance Weekly Record</Title>
          <p className="text-center mb-5 font-semibold text-ccdi-blue">
            For {startOfWeekFormatted} to {endOfWeekFormatted}
          </p>
          <WeeklyRecord />
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
