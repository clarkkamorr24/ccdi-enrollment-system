import { SubjectContext } from "@/contexts/subject-context-provider";
import { useContext } from "react";

export function useSubjectContext() {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error(
      "useSubjectContext must be used within a AttendanceContext Provider"
    );
  }

  return context;
}
