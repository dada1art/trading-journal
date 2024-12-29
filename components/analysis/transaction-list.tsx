"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { shortenAddress } from '@/lib/test-utils/wallet-helpers';

interface TransactionListProps {
  transactions: any[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (!transactions.length) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Signature</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.signature}>
              <TableCell>{formatDate(tx.timestamp)}</TableCell>
              <TableCell>
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {shortenAddress(tx.signature)}
                </a>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  tx.meta?.err ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {tx.meta?.err ? 'Failed' : 'Success'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}