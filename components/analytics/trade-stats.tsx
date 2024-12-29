"use client";

import { useMemo } from "react";
import { Trade } from "@/lib/types/trade";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

interface TradeStatsProps {
  trades: Trade[];
}

export function TradeStats({ trades }: TradeStatsProps) {
  const stats = useMemo(() => {
    const totalPnL = trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const winningTrades = trades.filter((trade) => (trade.pnl || 0) > 0);
    const winRate = trades.length ? (winningTrades.length / trades.length) * 100 : 0;

    return {
      totalTrades: trades.length,
      totalPnL,
      winRate: winRate.toFixed(1),
    };
  }, [trades]);

  return (
    <>
      <StatsCard
        title="Total Trades"
        value={stats.totalTrades}
        icon={TrendingUp}
      />
      <StatsCard
        title="Total P/L"
        value={`$${stats.totalPnL.toFixed(2)}`}
        icon={DollarSign}
      />
      <StatsCard
        title="Win Rate"
        value={`${stats.winRate}%`}
        icon={stats.totalPnL >= 0 ? ArrowUpRight : ArrowDownRight}
      />
    </>
  );
}