import moment from "moment";
import { useCallback, useState } from "react";

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const startOfWeek = currentDate.clone().startOf("isoWeek");
  const endOfWeek = currentDate.clone().endOf("isoWeek");

  const handlePreviousWeek = useCallback(() => {
    setCurrentDate((date) => date.clone().subtract(1, "weeks"));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate((date) => date.clone().add(1, "weeks"));
  }, []);

  const handleCurrentWeek = useCallback(() => {
    setCurrentDate(moment());
  }, []);

  return {
    currentDate,
    startOfWeek,
    endOfWeek,
    handlePreviousWeek,
    handleNextWeek,
    handleCurrentWeek,
  };
};
