"use client";

import { SubjectType } from "@/lib/types";
import { Subject } from "@prisma/client";
import { createContext } from "react";

type SubjectContextProviderProps = {
  data: Subject[];
  children: React.ReactNode;
};

type TSubjectContext = {
  subjects: Subject[];
};

export const SubjectContext = createContext<TSubjectContext | null>(null);

export default function SubjectContextProvider({
  data,
  children,
}: SubjectContextProviderProps) {
  //states

  //event hadnlers
  const handleAddSubject = (subject: SubjectType) => {
    console.log(subject);
  };
  return (
    <SubjectContext.Provider
      value={{
        subjects: data,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}
