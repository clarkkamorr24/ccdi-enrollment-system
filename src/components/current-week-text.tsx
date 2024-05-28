import { useAttendanceContext } from "@/hooks/useAttendance";
import React from "react";

export default function CurrentWeek() {
  const { handleCurrentWeek } = useAttendanceContext();
  return (
    <p
      className="flex items-center justify-center mb-2 text-[10px] text-ccdi-blue underline cursor-pointer"
      onClick={() => handleCurrentWeek()}
    >
      Go back to the current week
    </p>
  );
}
