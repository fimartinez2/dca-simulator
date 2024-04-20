import { TradesResponse } from "@/interface/market";

export const getAverageTradePrice = (prices: number[]) => {
  return prices.reduce((acc, cur) => acc + cur, 0) / prices.length;
};
