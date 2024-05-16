"use client";

import { addSubject, deleteSubject, updateSubject } from "@/actions/action";
import { SubjectType } from "@/lib/types";
import { Subject } from "@prisma/client";
import { createContext, useState } from "react";
import { toast } from "sonner";

type SubjectContextProviderProps = {
  data: Subject[];
  children: React.ReactNode;
};

type TSubjectContext = {
  selectedSubjectId: Subject["id"] | null;
  selectedSubject: Subject | undefined;
  handleChangeSelectSubjectId: (id: Subject["id"]) => void;
  handleAddSubject: (subject: SubjectType) => Promise<void>;
  handleEditSubject: (id: Subject["id"], subject: SubjectType) => Promise<void>;
  handleDeleteSubject: (subjectId: Subject["id"]) => Promise<void>;
  subjects: Subject[];
};

export const SubjectContext = createContext<TSubjectContext | null>(null);

export default function SubjectContextProvider({
  data,
  children,
}: SubjectContextProviderProps) {
  //states

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );

  const selectedSubject = data.find(
    (subject) => subject.id === selectedSubjectId
  );
  //event hadnlers
  const handleAddSubject = async (subject: SubjectType) => {
    const error = await addSubject(subject);
    toast.success("Subject added successfully");
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditSubject = async (id: Subject["id"], subject: SubjectType) => {
    const error = await updateSubject(id, subject);
    if (error) {
      console.log("error", error);
      return;
    }

    toast.success("Subject updated successfully");
  };

  const handleDeleteSubject = async (subjectId: Subject["id"]) => {
    toast.success("Subject deleted successfully");
    const error = await deleteSubject(subjectId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectSubjectId = (id: Subject["id"]) => {
    setSelectedSubjectId(id);
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects: data,
        selectedSubjectId,
        selectedSubject,
        handleChangeSelectSubjectId,
        handleAddSubject,
        handleEditSubject,
        handleDeleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}
