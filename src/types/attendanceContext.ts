import { Attendance, Student } from "@prisma/client";
import { Moment } from "moment";
import { Status } from "./status";
import { TRecord } from "./record";

export type AttendanceContextProviderProps = {
  data: (Student & {
    attendance: Attendance[];
  })[];
  children: React.ReactNode;
};

export type TAttendanceContext = {
  selectedStrands: string[];
  setSelectedStrands: (strands: string[]) => void;
  selectedSemesters: string[];
  setSelectedSemesters: (semesters: string[]) => void;
  handleFilterAttendance: (strands: string[], semesters: string[]) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleCurrentWeek: () => void;
  startOfWeek: Moment;
  endOfWeek: Moment;
  records: TRecord[];
  isFiltering: boolean;
  handleMarkAs: (studentId: string, type: Status) => Promise<void>;
  handleUpdateAs: (
    studentId: string,
    attendanceId: string,
    date: string,
    type: Status | undefined
  ) => Promise<void>;
};
