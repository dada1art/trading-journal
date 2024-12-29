"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Trade } from "@/lib/types/trade";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatDate } from "@/lib/utils";

interface PerformanceChartProps {
  trades: Trade[];
}

interface ChartData {
  date: number;
  pnl: number;
  cumulative: number;
}

export function PerformanceChart({ trades }: PerformanceChartProps) {
  const chartData = useMemo(() => {
    let cumulative = 0;
    return trades
      .filter(trade => trade.pnl !== undefined)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(trade => {
        cumulative += trade.pnl || 0;
        return {
          date: trade.timestamp,
          pnl: trade.pnl || 0,
          cumulative
        };
      });
  }, [trades]);

  if (trades.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          No performance data available yet.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Performance Over Time</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(timestamp) => formatDate(timestamp)}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'P/L']}
            />
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}