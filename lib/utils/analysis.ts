export interface TraderStats {
  winRate: number;
  totalPnL: number;
  avgTradeSize: number;
  totalTrades: number;
}

export function calculateTraderStats(trades: any[]): TraderStats {
  if (!trades.length) {
    return {
      winRate: 0,
      totalPnL: 0,
      avgTradeSize: 0,
      totalTrades: 0,
    };
  }

  const winningTrades = trades.filter(trade => trade.pnl && trade.pnl > 0);
  const totalPnL = trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
  const totalSize = trades.reduce((sum, trade) => sum + trade.size, 0);

  return {
    winRate: (winningTrades.length / trades.length) * 100,
    totalPnL,
    avgTradeSize: totalSize / trades.length,
    totalTrades: trades.length,
  };
}