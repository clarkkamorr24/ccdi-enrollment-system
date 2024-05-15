"use client";

import { createContext, useOptimistic } from "react";
import { StudentType } from "@/lib/types";
import { Student } from "@prisma/client";
import { addStudent } from "@/actions/action";

type StudentContextProviderProps = {
  data: Student[];
  children: React.ReactNode;
};

type TStudentContext = {
  students: Student[];
  handleAddStudent: (student: StudentType) => Promise<void>;
};

export const StudentContext = createContext<TStudentContext | null>(null);

export default function StudentContextProvider({
  data,
  children,
}: StudentContextProviderProps) {
  //states
  const [optimisticStudents, setOptimisticStudents] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        default:
          return state;
      }
    }
  );

  const handleAddStudent = async (student: StudentType) => {
    setOptimisticStudents({ action: "add", payload: student });
    const error = await addStudent(student);
    if (error) {
      console.log("error", error);
      return;
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students: optimisticStudents,
        handleAddStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
