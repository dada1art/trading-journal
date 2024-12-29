export interface Trade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  size: number;
  pnl?: number;
  notes?: string;
  timestamp: number;
  walletAddress: string;
}

export interface TradeFormData {
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  size: number;
  notes?: string;
}