import { useAttendanceContext } from "@/hooks/useAttendance";
import React from "react";

export default function CurrentWeek() {
  const { handleCurrentWeek } = useAttendanceContext();
  return (
    <p
      className="mb-2 flex cursor-pointer items-center justify-center text-[10px] text-ccdi-blue underline"
      onClick={() => handleCurrentWeek()}
    >
      Go back to the current week
    </p>
  );
}
