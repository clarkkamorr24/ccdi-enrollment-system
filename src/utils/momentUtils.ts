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

export function getRangeOfTheWeek() {
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

export function getFixedDate(date: Date) {
  const fixedDate = moment(date).subtract(1, "day").add(16, "hour");

  return fixedDate;
}

export function getTodayDate() {
  const todaysDate = moment().format("dddd, MMMM Do YYYY");

  return todaysDate;
}
export function getTime(time: string) {
  const convertedTime = moment(time, "h:mm a").format("hh:mm A");

  return convertedTime;
}
