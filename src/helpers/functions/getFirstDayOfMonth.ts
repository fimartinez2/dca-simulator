function getFirstDayOfMonth(date: Date): Date {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  const firstDayOfMonth = new Date(Date.UTC(year, month, 1, 12, 0, 0));

  return firstDayOfMonth;
}

export default getFirstDayOfMonth;
