"use client";

import { Trade } from '@/lib/types/trade';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

interface TraderTradesProps {
  trades: Trade[];
}

export function TraderTrades({ trades }: TraderTradesProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Entry</TableHead>
            <TableHead className="text-right">Exit</TableHead>
            <TableHead className="text-right">Size</TableHead>
            <TableHead className="text-right">P/L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{formatDate(trade.timestamp)}</TableCell>
              <TableCell>{trade.symbol}</TableCell>
              <TableCell className={trade.type === 'long' ? 'text-green-600' : 'text-red-600'}>
                {trade.type.toUpperCase()}
              </TableCell>
              <TableCell className="text-right">${trade.entryPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                {trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : '-'}
              </TableCell>
              <TableCell className="text-right">{trade.size}</TableCell>
              <TableCell className={`text-right ${trade.pnl && trade.pnl > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trade.pnl ? `$${trade.pnl.toFixed(2)}` : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}