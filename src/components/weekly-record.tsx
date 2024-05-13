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
import { weekdays } from "@/utils/weekdays";

export default function WeeklyRecord() {
  const { records } = useAttendanceContext();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Name</TableHead>
          {weekdays.map((weekday) => (
            <TableHead key={weekday} className="font-bold">
              {weekday}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records?.map((record) => (
          <TableRow key={record.name}>
            <TableCell className="font-medium">{record.name}</TableCell>
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
  );
}
