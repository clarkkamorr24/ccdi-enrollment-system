"use client";

import {
  addAttendance,
  geAttendanceByStudentId,
  getStudentById,
  updateAttendance,
} from "@/actions/action";
import moment from "moment";
import { TRecord } from "@/types/record";
import { getFixedDate } from "@/utils/momentUtils";
import { createContext, useOptimistic } from "react";
import { toast } from "sonner";

type AttendanceContextProviderProps = {
  data: TRecord[];
  children: React.ReactNode;
};

type TAttendanceContext = {
  records: TRecord[];
  handleMarkAs: (
    studentId: string,
    type: "present" | "absent"
  ) => Promise<void>;
};

export const AttendanceContext = createContext<TAttendanceContext | null>(null);

export default function AttendanceContextProvider({
  data,
  children,
}: AttendanceContextProviderProps) {
  //states
  const [optimisticRecords, setOptimisticRecords] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return {
            ...state,
            [payload.studentId]: {
              ...state[payload.studentId],
              [payload.day]: payload.isPresent,
            },
          };
        case "update":
          return {
            ...state,
            [payload.studentId]: {
              ...state[payload.studentId],
              [payload.day]: payload.isPresent,
            },
          };
        default:
          return state;
      }
    }
  );

  const handleMarkAs = async (
    studentId: string,
    type: "present" | "absent"
  ) => {
    //get attendance by student id
    const attendance = await geAttendanceByStudentId(studentId);

    //get the student by id
    const student = await getStudentById(studentId);

    //check if the attendance already exists
    const filteredAttendance = attendance.some(
      (attendance) =>
        getFixedDate(attendance.createdAt).format("l") === moment().format("l")
    );

    // console.log("attedance", attendance);

    let filterData = attendance.find(
      (attendance) =>
        getFixedDate(attendance.createdAt).format("l") === moment().format("l")
    );

    // update attendance
    if (filteredAttendance) {
      setOptimisticRecords({ action: "update", payload: studentId });

      type === "absent"
        ? toast.warning(`${student?.name} marked as absent`)
        : toast.success(`${student?.name} marked as present`);

      await updateAttendance(filterData?.id, type === "absent" ? false : true);
      return;
    }

    //proceed to add attendance
    setOptimisticRecords({ action: "add", payload: studentId });
    toast.success(
      `${student?.name} marked as ${type === "absent" ? "absent" : "present"}`
    );
    const error = await addAttendance(
      studentId,
      type === "absent" ? false : true
    );
    if (error) {
      console.log("error", error);
      return;
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        records: optimisticRecords,
        handleMarkAs,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
