"use client";

import { useClock } from "@/hooks/useClock";
import { getTodayDate } from "@/utils/momentUtils";
import React, { useEffect, useState } from "react";

export default function DateHeader() {
  const [isClient, setIsClient] = useState(false);
  const todayDate = getTodayDate();
  const time = useClock();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex px-4 justify-between items-center mt-5 max-w-[1050px] mx-auto py-4">
      <p className="text-ccdi-blue font-bold">{todayDate}</p>
      <p className=" text-ccdi-blue font-bold">
        {isClient ? `🕛 ${time.toLocaleTimeString()}` : ""}
      </p>
    </div>
  );
}
