"use client";

import { Trade } from '@/lib/types/trade';
import { calculateTraderStats } from '@/lib/utils/analysis';

interface TraderStatsProps {
  trades: Trade[];
}

export function TraderStats({ trades }: TraderStatsProps) {
  const stats = calculateTraderStats(trades);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Win Rate</p>
        <p className="text-lg font-semibold">{stats.winRate}%</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total P/L</p>
        <p className={`text-lg font-semibold ${stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${stats.totalPnL.toFixed(2)}
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Avg Trade Size</p>
        <p className="text-lg font-semibold">${stats.avgTradeSize.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total Trades</p>
        <p className="text-lg font-semibold">{stats.totalTrades}</p>
      </div>
    </div>
  );
}