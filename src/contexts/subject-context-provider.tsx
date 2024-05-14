"use client";

import { addSubject, deleteSubject } from "@/actions/action";
import { SubjectType } from "@/lib/types";
import { Subject } from "@prisma/client";
import { createContext } from "react";
import { toast } from "sonner";

type SubjectContextProviderProps = {
  data: Subject[];
  children: React.ReactNode;
};

type TSubjectContext = {
  handleAddSubject: (subject: SubjectType) => Promise<void>;
  handleDeleteSubject: (subjectId: Subject["id"]) => Promise<void>;
  subjects: Subject[];
};

export const SubjectContext = createContext<TSubjectContext | null>(null);

export default function SubjectContextProvider({
  data,
  children,
}: SubjectContextProviderProps) {
  //states

  //event hadnlers
  const handleAddSubject = async (subject: SubjectType) => {
    const error = await addSubject(subject);
    toast.success("Subject added successfully");
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleDeleteSubject = async (subjectId: Subject["id"]) => {
    toast.success("Subject deleted successfully");
    const error = await deleteSubject(subjectId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects: data,
        handleAddSubject,
        handleDeleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}
