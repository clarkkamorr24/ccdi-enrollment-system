"use client";

import { addSubject } from "@/actions/action";
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
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}
