import { AttendanceContext } from "@/contexts/attendance-context-provider";
import { useContext } from "react";

export function useAttendanceContext() {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error(
      "useAttendanceContext must be used within a AttendanceContext Provider"
    );
  }

  return context;
}
