interface TradeEntry {
  [index: number]: string; //  timestamp, amount, price, type, ID
}

interface TradesData {
  market_id: string;
  timestamp: null | string;
  last_timestamp: string;
  entries: TradeEntry[];
}

export interface TradesResponse {
  trades: TradesData;
}

export interface GetAllMarketsResponse {
  date: string;
  avgPrice: number;
}
