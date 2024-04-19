export function getLast12MonthsTimestamps(): number[] {
  const timestamps: number[] = [];
  const now = new Date();
  now.setUTCDate(1);
  now.setUTCHours(12, 0, 0, 0);

  for (let i = 0; i < 12; i++) {
    const timestamp = now.getTime();
    timestamps.push(timestamp);
    now.setUTCMonth(now.getUTCMonth() - 1);
  }
  return timestamps;
}

export function getTimestampsInRange(startDate: Date, endDate: Date): number[] {
  const timestamps: number[] = [];
  const currentDate = new Date(startDate.getTime());

  currentDate.setUTCDate(1);
  currentDate.setUTCHours(12, 0, 0, 0);

  while (currentDate <= endDate) {
    const timestamp = currentDate.getTime();
    timestamps.push(timestamp);
    currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
  }
  return timestamps;
}

export function getTimestampsByInterval(
  startDate: Date,
  endDate: Date,
  interval: "daily" | "weekly" | "monthly" | "yearly"
): number[] {
  const timestamps: number[] = [];
  const currentDate = new Date(startDate.getTime());

  currentDate.setUTCHours(0, 0, 0, 0);

  switch (interval) {
    case "daily":
      while (currentDate <= endDate) {
        timestamps.push(currentDate.getTime());
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
      break;
    case "weekly":
      while (currentDate <= endDate) {
        timestamps.push(currentDate.getTime());
        currentDate.setUTCDate(currentDate.getUTCDate() + 7);
      }
      break;
    case "monthly":
      currentDate.setUTCDate(1);
      while (currentDate <= endDate) {
        timestamps.push(currentDate.getTime());
        currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
      }
      break;
    case "yearly":
      currentDate.setUTCMonth(0);
      currentDate.setUTCDate(1);
      while (currentDate <= endDate) {
        timestamps.push(currentDate.getTime());
        currentDate.setUTCFullYear(currentDate.getUTCFullYear() + 1);
      }
      break;
    default:
      throw new Error(
        'Invalid interval provided. Valid values are "daily", "weekly", "monthly", or "yearly".'
      );
  }

  return timestamps;
}
