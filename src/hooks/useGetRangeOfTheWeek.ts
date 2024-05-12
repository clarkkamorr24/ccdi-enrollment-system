import moment from "moment";

let currentDate = moment();

export function startOfTheWeek() {
  const startOfWeek = currentDate.clone().startOf("isoWeek");

  return startOfWeek;
}

export function endOfTheWeek() {
  const endOfWeek = currentDate.clone().endOf("isoWeek");

  return endOfWeek;
}

export function useGetRangeOfTheWeek() {
  const startOfWeek = startOfTheWeek();
  const endOfWeek = endOfTheWeek();

  // Format the dates
  const startOfWeekFormatted = startOfWeek.format("MMMM D, YYYY");
  const endOfWeekFormatted = endOfWeek.format("MMMM D, YYYY");

  return {
    startOfWeekFormatted,
    endOfWeekFormatted,
  };
}
