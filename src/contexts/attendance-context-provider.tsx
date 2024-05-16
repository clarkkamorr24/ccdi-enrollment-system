"use client";

import {
  addAttendance,
  geAttendanceByStudentId,
  getStudentById,
  updateAttendance,
} from "@/actions/action";
import moment, { Moment } from "moment";
import { TRecord } from "@/types/record";
import { getFixedDate } from "@/utils/momentUtils";
import { createContext, useState, useCallback } from "react";
import { toast } from "sonner";
import { Attendance, Student } from "@prisma/client";

type AttendanceContextProviderProps = {
  data: (Student & {
    attendance: Attendance[];
  })[];
  children: React.ReactNode;
};

type TAttendanceContext = {
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  startOfWeek: Moment;
  endOfWeek: Moment;
  records: TRecord[];
  handleMarkAs: (
    studentId: string,
    type: "present" | "absent"
  ) => Promise<void>;
};

export const AttendanceContext = createContext<TAttendanceContext | null>(null);

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const startOfWeek = currentDate.clone().startOf("isoWeek");
  const endOfWeek = currentDate.clone().endOf("isoWeek");

  const handlePreviousWeek = useCallback(() => {
    setCurrentDate((date) => date.clone().subtract(1, "weeks"));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate((date) => date.clone().add(1, "weeks"));
  }, []);

  return {
    currentDate,
    startOfWeek,
    endOfWeek,
    handlePreviousWeek,
    handleNextWeek,
  };
};

const useFormattedRecords = (
  data: AttendanceContextProviderProps["data"],
  startOfWeek: Moment,
  endOfWeek: Moment
): TRecord[] => {
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
        (item) => getFixedDate(item.createdAt).day() === day
      );
      return {
        present: attendanceForDay?.present ?? undefined,
        date: startOfWeek.clone().day(day),
      };
    };

    return {
      name: attendance.name,
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

export default function AttendanceContextProvider({
  data,
  children,
}: AttendanceContextProviderProps) {
  const { startOfWeek, endOfWeek, handlePreviousWeek, handleNextWeek } =
    useCurrentDate();
  const records = useFormattedRecords(data, startOfWeek, endOfWeek);

  const handleMarkAs = async (
    studentId: string,
    type: "present" | "absent"
  ) => {
    try {
      const attendance = await geAttendanceByStudentId(studentId);
      const student = await getStudentById(studentId);

      const today = moment().format("l");
      const existingAttendance = attendance.find(
        (att) => getFixedDate(att.createdAt).format("l") === today
      );

      if (existingAttendance) {
        await updateAttendance(
          existingAttendance.id,
          type === "absent" ? false : true
        );
        toast.success(`${student?.name} marked as ${type}`);
      } else {
        await addAttendance(studentId, type === "absent" ? false : true);
        toast.success(`${student?.name} marked as ${type}`);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        records,
        handleMarkAs,
        handlePreviousWeek,
        handleNextWeek,
        startOfWeek,
        endOfWeek,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
