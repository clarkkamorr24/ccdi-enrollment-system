"use client";

import { createContext, useState } from "react";
import { StudentType } from "@/lib/types";
import { Student } from "@prisma/client";
import { addStudent, deleteStudent, updateStudent } from "@/actions/action";
import { toast } from "sonner";

type StudentContextProviderProps = {
  data: Student[];
  children: React.ReactNode;
};

type TStudentContext = {
  students: Student[];
  selectedStudentId: Student["id"] | null;
  selectedStudent: Student | undefined;
  handleChangeSelectStudentId: (id: Student["id"]) => void;
  handleAddStudent: (student: StudentType) => Promise<void>;
  handleEditStudent: (id: Student["id"], student: StudentType) => Promise<void>;
  handleDeleteStudent: (id: Student["id"]) => Promise<void>;
};

export const StudentContext = createContext<TStudentContext | null>(null);

export default function StudentContextProvider({
  data,
  children,
}: StudentContextProviderProps) {
  //states
  // const [optimisticStudents, setOptimisticStudents] = useOptimistic(
  //   data,
  //   (state, { action, payload }) => {
  //     switch (action) {
  //       case "add":
  //         return [...state, { ...payload, id: Math.random().toString() }];
  //       case "delete":
  //         return state.filter((student) => student.id !== payload);
  //       default:
  //         return state;
  //     }
  //   }
  // );
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const selectedStudent = data.find(
    (student) => student.id === selectedStudentId
  );

  const handleAddStudent = async (student: StudentType) => {
    // setOptimisticStudents({ action: "add", payload: student });
    const error = await addStudent(student);
    if (error) {
      console.log("error", error);
      return;
    }

    toast.success("Student added successfully");
  };

  const handleEditStudent = async (id: Student["id"], student: StudentType) => {
    // setOptimisticStudents({ action: "edit", payload: student });
    const error = await updateStudent(id, student);
    if (error) {
      console.log("error", error);
      return;
    }

    toast.success("Student updated successfully");
  };

  const handleDeleteStudent = async (id: Student["id"]) => {
    // setOptimisticStudents({ action: "delete", payload: id });
    const error = await deleteStudent(id);
    if (error) {
      console.log("error", error);
      return;
    }

    toast.success("Student deleted successfully");
    setSelectedStudentId(null);
  };

  const handleChangeSelectStudentId = (id: Student["id"]) => {
    setSelectedStudentId(id);
  };

  return (
    <StudentContext.Provider
      value={{
        students: data,
        selectedStudent,
        selectedStudentId,
        handleAddStudent,
        handleEditStudent,
        handleDeleteStudent,
        handleChangeSelectStudentId,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
