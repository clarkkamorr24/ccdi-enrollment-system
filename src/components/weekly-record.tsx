"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttendanceContext } from "@/hooks/useAttendance";
import { cn } from "@/lib/utils";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import moment from "moment";
import NoResultFound from "./no-result-found";
import { TDay } from "@/types/record";
import React from "react";

export default function WeeklyRecordTable() {
  const {
    records,
    handleNextWeek,
    handlePreviousWeek,
    startOfWeek,
    endOfWeek,
  } = useAttendanceContext();
  const startOfWeekFormatted = startOfWeek.format("MMMM D, YYYY");
  const endOfWeekFormatted = endOfWeek.format("MMMM D, YYYY");

  return (
    <>
      {!records.length && <NoResultFound />}
      {records.length > 0 && (
        <>
          <p className="text-center mb-5 font-semibold text-ccdi-blue flex justify-center gap-x-4 items-center">
            <AiOutlineLeft
              size={15}
              strokeWidth={70}
              onClick={() => handlePreviousWeek()}
              className="cursor-pointer"
            />
            {startOfWeekFormatted} to {endOfWeekFormatted}
            <AiOutlineRight
              size={15}
              strokeWidth={70}
              onClick={() => handleNextWeek()}
              className="cursor-pointer"
            />
          </p>
          <div className="h-[550px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ccdi-blue/80 rounded-sm hover:bg-ccdi-blue/80 flex py-4">
                  <TableHead className="text-white flex-1 flex justify-center items-center text-center">
                    Name
                  </TableHead>
                  {/* {console.log("records", records)} */}

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
                            <span
                              className={cn(
                                "text-white",
                                attendance.date.format("L") ===
                                  moment().format("L") &&
                                  "text-ccdi-blue bg-white rounded-full flex justify-center items-center px-2 py-1.5 text-xs"
                              )}
                            >
                              {dayText}
                            </span>
                          </div>
                        </TableHead>
                      );
                    })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.name} className="flex">
                    <TableCell className="font-medium text-xs flex justify-center items-center flex-1">
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
                            {attendance.present === undefined ? (
                              <p className="text-slate-500">
                                {isSame ? "TBD" : "No record"}
                              </p>
                            ) : attendance.present ? (
                              <span className="text-green-500 ">
                                {"Present"}
                              </span>
                            ) : (
                              <span className="text-ccdi-red ">{"Absent"}</span>
                            )}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
