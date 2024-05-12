import { getAttendanceRecord } from "@/actions/action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { endOfTheWeek, startOfTheWeek } from "@/hooks/useGetRangeOfTheWeek";

import { weekdays } from "@/utils/weekdays";
import moment from "moment";

export default async function WeeklyRecord() {
  const attendances = await getAttendanceRecord();
  const startOfWeek = startOfTheWeek();
  const endOfWeek = endOfTheWeek();

  const records = attendances.map((attendance) => {
    // Filter the attendances for the current week
    const currentWeekAttendances = attendance.attendance.filter(
      (item) =>
        moment(item.createdAt).isSameOrAfter(startOfWeek, "day") &&
        moment(item.createdAt).isSameOrBefore(endOfWeek, "day")
    );

    return {
      name: attendance.name,
      monday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 1
      )?.present,
      tuesday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 2
      )?.present,
      wednesday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 3
      )?.present,
      thursday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 4
      )?.present,
      friday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 5
      )?.present,
      saturday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 6
      )?.present,
      sunday: currentWeekAttendances.find(
        (item) => moment(item.createdAt).day() === 0
      )?.present,
    };
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          {weekdays.map((weekday) => (
            <TableHead key={weekday}>{weekday}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.name}>
            <TableCell className="font-medium">{record.name}</TableCell>
            {Object.entries(record)
              .slice(1)
              .map(([day, present]) => (
                <TableCell key={day} className="font-medium text-xs">
                  {present === undefined
                    ? "TBD"
                    : present
                    ? "Present"
                    : "Absent"}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
