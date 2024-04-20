import {
  GetAllMarketsResponse,
  MarketList,
  TradesResponse,
} from "@/interface/market";
import api from "./api";
import { QueryFunctionContext } from "@tanstack/react-query";
import { getTimestampsByInterval } from "@/helpers/functions/timestampGetters";
import { getAverageTradePrice } from "@/helpers/functions/getAvgPrice";

const getMarketTrade = async (
  market: string,
  timestamp: number,
  limit: number
) => {
  const response = await api.get<TradesResponse>(`/markets/${market}/trades`, {
    params: {
      limit: limit ?? 50,
      timestamp: timestamp ?? Date.now(),
    },
  });
  return response.data;
};

export const getAllTrades = async (
  ctx: QueryFunctionContext<
    [string, string, "daily" | "weekly" | "monthly" | "yearly", Date, Date]
  >
): Promise<GetAllMarketsResponse[]> => {
  const [_, market, interval, startDate, endDate] = ctx.queryKey;
  const timestamps = getTimestampsByInterval(startDate, endDate, interval);
  const responses = await Promise.all(
    timestamps.map((timestamp) => getMarketTrade(market, timestamp, 10))
  );

  return responses.map((response, index) => {
    const avgPrice = getAverageTradePrice(
      response.trades.entries.map((entry) => parseFloat(entry[2]))
    );
    return {
      date: new Date(timestamps[index]),
      avgPrice: avgPrice,
    };
  });
};

export const getMarkets = async () => {
  const response = await api.get<MarketList>("/markets");
  return response.data;
};
