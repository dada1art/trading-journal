import { Trade, TradeFormData } from '@/lib/types/trade';
import { calculatePnL } from '@/lib/utils';

export function createMockTrade(data: Partial<Trade> = {}): Trade {
  return {
    id: Math.random().toString(36).substring(7),
    symbol: 'SOL/USD',
    type: 'long',
    entryPrice: 100,
    size: 1,
    timestamp: Date.now(),
    walletAddress: 'mock-address',
    ...data,
  };
}

export function validateTradeData(data: TradeFormData): string[] {
  const errors: string[] = [];
  
  if (!data.symbol) errors.push('Symbol is required');
  if (data.entryPrice <= 0) errors.push('Entry price must be positive');
  if (data.size <= 0) errors.push('Size must be positive');
  if (data.exitPrice !== undefined && data.exitPrice <= 0) {
    errors.push('Exit price must be positive');
  }

  return errors;
}

export function calculateTradePnL(trade: Trade): number | undefined {
  if (!trade.exitPrice) return undefined;
  return calculatePnL(trade.entryPrice, trade.exitPrice, trade.size, trade.type);
}