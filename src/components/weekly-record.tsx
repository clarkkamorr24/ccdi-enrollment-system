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
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./component-to-print";
import { AiOutlinePrinter } from "react-icons/ai";
import WeeklyRecordPopover from "./weekly-record-popover";

export default function WeeklyRecordTable() {
  const {
    records,
    handleNextWeek,
    handlePreviousWeek,
    handleCurrentWeek,
    startOfWeek,
    endOfWeek,
  } = useAttendanceContext();
  const startOfWeekFormatted = startOfWeek.format("MMMM D, YYYY");
  const endOfWeekFormatted = endOfWeek.format("MMMM D, YYYY");

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      {!records.length && <NoResultFound />}
      {records.length > 0 && (
        <>
          <div className="relative text-center mb-5 font-semibold text-ccdi-blue flex justify-center md:gap-x-4 gap-x-2 items-center">
            <Button
              size="sm"
              className="absolute left-0 bg-ccdi-blue/80 hover:bg-ccdi-blue h-6 flex items-center gap-x-1"
              onClick={() => handlePrint()}
            >
              Print
              <AiOutlinePrinter size={15} />
            </Button>
            <Button
              size="sm"
              className="absolute right-0 bg-ccdi-blue/80 hover:bg-ccdi-blue h-6 md:text-xs text-[10px]"
              onClick={() => handleCurrentWeek()}
            >
              Current Week
            </Button>
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
          </div>
          <div className="h-[550px] overflow-auto">
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
                        const isSameOrAfter = attendance.date.isSameOrAfter(
                          moment().format()
                        );

                        return (
                          <WeeklyRecordPopover
                            key={day}
                            attendance={attendance}
                            onClick={
                              isSameOrAfter
                                ? (e) => e.preventDefault()
                                : undefined
                            }
                          >
                            <TableCell className="font-medium text-xs flex justify-center items-center flex-1 cursor-pointer hover:bg-gray-200">
                              {attendance.status === undefined ? (
                                <p className="text-slate-500">
                                  {isSameOrAfter ? "TBD" : "No record"}
                                </p>
                              ) : attendance.status === "present" ? (
                                <span className="text-green-500 ">
                                  {"Present"}
                                </span>
                              ) : attendance.status === "absent" ? (
                                <span className="text-ccdi-red ">
                                  {"Absent"}
                                </span>
                              ) : (
                                <span className="text-bg-black ">{"Late"}</span>
                              )}
                            </TableCell>
                          </WeeklyRecordPopover>
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
