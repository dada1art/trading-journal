"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TradeList() {
  // TODO: Implement trade fetching logic
  const trades: any[] = [];

  if (trades.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No trades recorded yet. Add your first trade to get started!
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Entry</TableHead>
          <TableHead>Exit</TableHead>
          <TableHead>P/L</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>{trade.date}</TableCell>
            <TableCell>{trade.symbol}</TableCell>
            <TableCell>{trade.type}</TableCell>
            <TableCell>{trade.entry}</TableCell>
            <TableCell>{trade.exit}</TableCell>
            <TableCell>{trade.pnl}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}