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
  error: string | null;
  setError: (error: string | null) => void;
  selectedStudentId: Student["id"] | null;
  selectedStudent: Student | undefined;
  handleChangeSelectStudentId: (id: Student["id"]) => void;
  handleAddStudent: (student: StudentType) => Promise<
    | {
        message: string;
      }
    | undefined
  >;
  handleEditStudent: (
    id: Student["id"],
    student: StudentType
  ) => Promise<
    | {
        message: string;
      }
    | undefined
  >;
  handleDeleteStudent: (id: Student["id"]) => Promise<void>;
};

export const StudentContext = createContext<TStudentContext | null>(null);

export default function StudentContextProvider({
  data,
  children,
}: StudentContextProviderProps) {
  //states
  const [error, setError] = useState<string | null>(null);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const selectedStudent = data.find(
    (student) => student.id === selectedStudentId
  );

  //event handlers
  const handleAddStudent = async (student: StudentType) => {
    const error = await addStudent(student);
    if (error) {
      setError(error.message);
      return error;
    }

    setError(null);
    toast.success("Student added successfully");
  };

  const handleEditStudent = async (id: Student["id"], student: StudentType) => {
    const error = await updateStudent(id, student);
    if (error) {
      setError(error.message);
      return error;
    }

    toast.success("Student updated successfully");
  };

  const handleDeleteStudent = async (id: Student["id"]) => {
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
        error,
        setError,
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
