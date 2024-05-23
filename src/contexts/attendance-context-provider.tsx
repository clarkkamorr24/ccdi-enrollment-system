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
import { Status } from "@/types/status";
import { getTodayDate } from "@/utils/getTodayDate";

type AttendanceContextProviderProps = {
  data: (Student & {
    attendance: Attendance[];
  })[];
  children: React.ReactNode;
};

type TAttendanceContext = {
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleCurrentWeek: () => void;
  startOfWeek: Moment;
  endOfWeek: Moment;
  records: TRecord[];
  handleMarkAs: (studentId: string, type: Status) => Promise<void>;
  handleUpdateAs: (
    studentId: string,
    attendanceId: string | undefined,
    date: string,
    type: Status | undefined
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

  const handleCurrentWeek = useCallback(() => {
    setCurrentDate(moment());
  }, []);

  return {
    currentDate,
    startOfWeek,
    endOfWeek,
    handlePreviousWeek,
    handleNextWeek,
    handleCurrentWeek,
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
        (item) => getFixedDate(item.createdAt).isoWeekday() === day
      );

      return {
        status: attendanceForDay?.status ?? undefined,
        date: startOfWeek.clone().isoWeekday(day),
        studentId: attendance.id,
        attendanceId: attendanceForDay?.id ?? undefined,
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
  const {
    startOfWeek,
    endOfWeek,
    handlePreviousWeek,
    handleNextWeek,
    handleCurrentWeek,
  } = useCurrentDate();
  const records = useFormattedRecords(data, startOfWeek, endOfWeek);
  const todayDate = getTodayDate();

  const handleUpdateAs = async (
    studentId: string,
    attendanceId: string | undefined,
    date: string,
    type: Status | undefined
  ) => {
    try {
      if (attendanceId) {
        await updateAttendance(attendanceId, type as Status, date);
      } else {
        await addAttendance(studentId, type as Status, date);
      }

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };

  const handleMarkAs = async (studentId: string, type: Status) => {
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
          type === "present"
            ? "present"
            : type === "absent"
            ? "absent"
            : "late",
          todayDate
        );
      } else {
        await addAttendance(
          studentId,
          type === "present"
            ? "present"
            : type === "absent"
            ? "absent"
            : "late",
          todayDate
        );
      }

      toast.success(`${student?.name} marked as ${type}`);
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
        handleUpdateAs,
        handlePreviousWeek,
        handleNextWeek,
        handleCurrentWeek,
        startOfWeek,
        endOfWeek,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
