import React, { forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttendanceContext } from "@/hooks/useAttendance";
import moment from "moment";
import { TDay } from "@/types/record";
import H1 from "./h1";
import Logo from "./logo";

const ComponentToPrint = forwardRef<HTMLDivElement>((_, ref) => {
  const { records, startOfWeek, endOfWeek } = useAttendanceContext();
  const startOfWeekFormatted = startOfWeek.format("MMMM D, YYYY");
  const endOfWeekFormatted = endOfWeek.format("MMMM D, YYYY");
  return (
    <div ref={ref} className="relative">
      <div className="absolute flex justify-center items-center mt-5 left-4 -top-8">
        <Logo />
      </div>
      <H1 className="text-center mt-5 mb-5 uppercase text-ccdi-blue">
        Attendance Weekly Record
      </H1>
      <div className="relative text-center font-semibold text-ccdi-blue flex justify-center md:gap-x-4 gap-x-2 items-center">
        {startOfWeekFormatted} to {endOfWeekFormatted}
      </div>
      <div className="h-[550px] overflow-auto mt-8">
        {records.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="bg-ccdi-blue/80 rounded-sm hover:bg-ccdi-blue/80 flex py-4">
                <TableHead className="text-white flex-1 flex justify-center items-center text-center">
                  Name
                </TableHead>
                {Object.entries(records[0])
                  .filter(([day]) => day !== "name")
                  .map(([day, dayAttendance]) => {
                    const attendance = dayAttendance as TDay;
                    const weekText = attendance.date.format("ddd");
                    const dayText = attendance.date.format("DD");

                    return (
                      <TableHead
                        key={day}
                        className="flex flex-1 justify-center"
                      >
                        <div className="flex flex-col justify-center items-center gap-y-2">
                          <span className="text-white uppercase">
                            {weekText}
                          </span>
                          <span className="text-white">{dayText}</span>
                        </div>
                      </TableHead>
                    );
                  })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.name} className="flex">
                  <TableCell className="font-medium text-xs flex justify-center items-center flex-1 text-center">
                    {record.name}
                  </TableCell>

                  {Object.entries(record)
                    .slice(1)
                    .map(([day, dayAttendance]) => {
                      const attendance = dayAttendance as TDay;
                      const isSame = attendance.date.isSameOrAfter(
                        moment().format()
                      );

                      return (
                        <TableCell
                          key={day}
                          className="font-medium text-xs flex justify-center items-center flex-1"
                        >
                          {attendance.status === undefined ? (
                            <p className="text-slate-500">
                              {isSame ? "TBD" : "No record"}
                            </p>
                          ) : attendance.status === "present" ? (
                            <span className="text-green-500 ">{"Present"}</span>
                          ) : attendance.status === "absent" ? (
                            <span className="text-ccdi-red ">{"Absent"}</span>
                          ) : (
                            <span className="text-bg-black ">{"Late"}</span>
                          )}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
