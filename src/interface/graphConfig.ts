export interface GraphConfig {
  startDate: Date;
  endDate: Date;
  interval: "daily" | "weekly" | "monthly" | "yearly";
  market: string;
}
