import { GraphConfig } from "@/interface/graphConfig";
import { create } from "zustand";

const initialConfigState: GraphConfig = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  endDate: new Date(),
  interval: "monthly",
  market: "BTC-CLP",
};

interface GraphConfigStore extends GraphConfig {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setInterval: (interval: "daily" | "weekly" | "monthly" | "yearly") => void;
  setMarket: (market: string) => void;
}

export const useGraphConfig = create<GraphConfigStore>()((set) => ({
  ...initialConfigState,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setInterval: (interval) => set({ interval }),
  setMarket: (market) => set({ market }),
}));
