"use client";

import { createContext, useState, useCallback, useMemo } from "react";
import {
  addAttendance,
  geAttendanceByStudentId,
  getStudentById,
  updateAttendance,
} from "@/actions/action";
import moment from "moment";
import { toast } from "sonner";
import { getFixedDate } from "@/utils/momentUtils";
import { Status } from "@/types/status";
import { getTodayDate } from "@/utils/getTodayDate";
import { formatRecords } from "@/utils/attendanceUtils";
import {
  AttendanceContextProviderProps,
  TAttendanceContext,
} from "@/types/attendanceContext";
import { useCurrentDate } from "@/hooks/useCurrentDate";

export const AttendanceContext = createContext<TAttendanceContext | null>(null);

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

  const records = formatRecords(data, startOfWeek, endOfWeek);
  const todayDate = getTodayDate();
  const [selectedStrands, setSelectedStrands] = useState<string[]>([]);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  const handleFilterAttendance = useCallback(
    (strands: string[], semesters: string[]) => {
      setSelectedStrands(strands);
      setSelectedSemesters(semesters);
    },
    []
  );

  const filteredRecords = useMemo(() => {
    if (selectedStrands.length === 0 && selectedSemesters.length === 0) {
      return records;
    }

    return records.filter((record) => {
      const strandMatches =
        selectedStrands.length === 0 || selectedStrands.includes(record.strand);
      const semesterMatches =
        selectedSemesters.length === 0 ||
        selectedSemesters.includes(record.semester);
      return strandMatches && semesterMatches;
    });
  }, [records, selectedStrands, selectedSemesters]);

  const handleUpdateAs = async (
    studentId: string,
    attendanceId: string,
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
        await updateAttendance(existingAttendance.id, type, todayDate);
      } else {
        await addAttendance(studentId, type, todayDate);
      }

      toast.success(`${student?.firstName} marked as ${type}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        records: filteredRecords,
        handleFilterAttendance,
        selectedStrands,
        setSelectedStrands,
        selectedSemesters,
        setSelectedSemesters,
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
