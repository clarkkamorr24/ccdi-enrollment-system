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
import { getRangeOfTheWeek } from "@/utils/momentUtils";
import { weekdays } from "@/utils/weekdays";
import moment from "moment";
import NoResultFound from "./no-result-found";

export default function WeeklyRecordTable() {
  const { records } = useAttendanceContext();
  const activeWeekday = moment().format("ddd");
  const activeDay = moment().format("DD");
  const { endOfWeekFormatted, startOfWeekFormatted } = getRangeOfTheWeek();

  return (
    <>
      {!records.length && <NoResultFound />}
      {records.length > 0 && (
        <>
          <p className="text-center mb-5 font-semibold text-ccdi-blue">
            For {startOfWeekFormatted} to {endOfWeekFormatted}
          </p>
          <div className="h-[550px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-ccdi-blue/80 rounded-md hover:bg-ccdi-blue/80">
                  <TableHead className="w-[100px] text-white">Name</TableHead>
                  {weekdays.map((weekday) => (
                    <TableHead key={weekday}>
                      <span
                        className={cn(
                          "text-white",
                          activeWeekday === weekday
                            ? "font-extrabold bg-white rounded-md text-ccdi-blue px-2"
                            : ""
                        )}
                      >
                        {activeWeekday === weekday && weekday + ` ${activeDay}`}
                        {activeWeekday !== weekday && weekday}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {records?.map((record) => (
                  <TableRow key={record.name}>
                    <TableCell className="font-medium text-xs">
                      {record.name}
                    </TableCell>
                    {Object.entries(record)
                      .slice(1)
                      .map(([day, present]) => (
                        <TableCell key={day} className="font-medium text-xs">
                          {present === null ? (
                            <p className="text-slate-500">{"TBD"}</p>
                          ) : present ? (
                            <span className="text-green-500">{"Present"}</span>
                          ) : (
                            <span className="text-ccdi-red">{"Absent"}</span>
                          )}
                        </TableCell>
                      ))}
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
