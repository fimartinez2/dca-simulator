interface TradeEntry {
  [index: number]: string; //  timestamp, amount, price, type, ID
}

interface TradesData {
  id: number;
  market_id: string;
  timestamp: null | string;
  last_timestamp: string;
  entries: TradeEntry[];
}

export interface TradesResponse {
  trades: TradesData;
}

export interface GetAllMarketsResponse {
  date: Date;
  avgPrice: number;
}
