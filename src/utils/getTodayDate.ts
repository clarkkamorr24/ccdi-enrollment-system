export function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dateFormatted = `${month}/${day}/${year}`;

  return dateFormatted;
}
