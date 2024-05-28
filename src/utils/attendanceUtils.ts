// utils/attendanceUtils.js
import { AttendanceContextProviderProps } from "@/types/attendanceContext";
import { getFixedDate } from "@/utils/momentUtils";
import { Moment } from "moment";

export const formatRecords = (
  data: AttendanceContextProviderProps["data"],
  startOfWeek: Moment,
  endOfWeek: Moment
) => {
  return data.map((attendance) => {
    const currentWeekAttendances = attendance.attendance.filter((item) => {
      const date = getFixedDate(item.createdAt);
      return (
        date.isSameOrAfter(startOfWeek, "day") &&
        date.isSameOrBefore(endOfWeek, "day")
      );
    });

    const getAttendanceForDay = (day: number) => {
      const attendanceForDay = currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).isoWeekday() === day
      );

      return {
        status: attendanceForDay?.status ?? undefined,
        date: startOfWeek.clone().isoWeekday(day),
        studentId: attendance.id,
        attendanceId: attendanceForDay?.id ?? undefined,
      };
    };

    const fullName = `${attendance.lastName}, ${attendance.firstName} ${attendance.middleName}`;

    return {
      name: fullName,
      strand: attendance.strand,
      semester: attendance.semester,
      monday: getAttendanceForDay(1),
      tuesday: getAttendanceForDay(2),
      wednesday: getAttendanceForDay(3),
      thursday: getAttendanceForDay(4),
      friday: getAttendanceForDay(5),
      saturday: getAttendanceForDay(6),
      sunday: getAttendanceForDay(7),
    };
  });
};
