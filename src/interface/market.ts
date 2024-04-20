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

export interface Market {
  id: string;
  name: string;
  base_currency: string;
  quote_currency: string;
  minimum_order_amount: [string, string]; // Tuple containing [amount, currency]
  disabled: boolean;
  illiquid: boolean;
  rpo_disabled: boolean | null;
  taker_fee: number;
  maker_fee: number;
  max_orders_per_minute: number;
  maker_discount_percentage: string;
  taker_discount_percentage: string;
}

export interface MarketList {
  markets: Market[];
}
