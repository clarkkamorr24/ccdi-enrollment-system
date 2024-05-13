import { getAttendanceRecord } from "@/actions/action";
import { checkAuth } from "@/lib/server-utils";
import { TRecord } from "@/types/record";
import {
  endOfTheWeek,
  getFixedDate,
  startOfTheWeek,
} from "@/utils/momentUtils";

export async function getRecords() {
  const session = await checkAuth();
  const attendances = await getAttendanceRecord(session.user.id);
  const startOfWeek = startOfTheWeek();
  const endOfWeek = endOfTheWeek();

  const records = attendances.map((attendance) => {
    // Filter the attendances for the current
    const currentWeekAttendances = attendance.attendance.filter((item) => {
      return (
        getFixedDate(item.createdAt).isSameOrAfter(startOfWeek, "day") &&
        getFixedDate(item.createdAt).isSameOrBefore(endOfWeek, "day")
      );
    });

    return {
      name: attendance.name,
      monday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 1
      )?.present,
      tuesday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 2
      )?.present,
      wednesday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 3
      )?.present,
      thursday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 4
      )?.present,
      friday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 5
      )?.present,
      saturday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 6
      )?.present,
      sunday: currentWeekAttendances.find(
        (item) => getFixedDate(item.createdAt).day() === 0
      )?.present,
    };
  });

  const formattedRecords: TRecord[] = records.map((record) => ({
    name: record.name,
    monday: record.monday ?? null,
    tuesday: record.tuesday ?? null,
    wednesday: record.wednesday ?? null,
    thursday: record.thursday ?? null,
    friday: record.friday ?? null,
    saturday: record.saturday ?? null,
    sunday: record.sunday ?? null,
  }));

  return formattedRecords;
}
