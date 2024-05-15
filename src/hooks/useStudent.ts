import { StudentContext } from "@/contexts/student-context-provider";
import { useContext } from "react";

export function useStudentContext() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudentContext must be used within a StudentContext Provider"
    );
  }

  return context;
}
