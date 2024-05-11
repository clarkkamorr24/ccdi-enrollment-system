import moment from "moment";

export function useGetRangeOfTheWeek() {
  const currentDate = moment();

  // Get the start of the current week (Monday)
  const startOfWeek = currentDate.clone().startOf("week").add(1, "day");

  // Get the end of the current week (Sunday)
  const endOfWeek = currentDate.clone().endOf("week").add(1, "day");

  // Format the dates
  const startOfWeekFormatted = startOfWeek.format("MMMM D");
  const endOfWeekFormatted = endOfWeek.format("MMMM D");

  return {
    startOfWeekFormatted,
    endOfWeekFormatted,
  };
}
