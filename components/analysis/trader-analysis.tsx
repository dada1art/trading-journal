"use client";

import { useTraderAnalysis } from '@/lib/hooks/use-trader-analysis';
import { useAddressLookup } from '@/lib/solana/hooks/useAddressLookup';
import { Card } from '@/components/ui/card';
import { shortenAddress } from '@/lib/test-utils/wallet-helpers';
import { TraderStats } from './trader-stats';
import { TraderTrades } from './trader-trades';
import { TransactionList } from './transaction-list';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TraderAnalysisProps {
  address: string;
}

export function TraderAnalysis({ address }: TraderAnalysisProps) {
  const { trades, loading: tradesLoading, error: tradesError } = useTraderAnalysis(address);
  const { transactions, loading: txLoading, error: txError } = useAddressLookup(address);
  const [activeTab, setActiveTab] = useState<'trades' | 'transactions'>('trades');

  if (tradesLoading || txLoading) {
    return <div className="animate-pulse">Loading trader data...</div>;
  }

  if (tradesError || txError) {
    return (
      <div className="text-red-500">
        Error loading data: {(tradesError || txError)?.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Trader: {shortenAddress(address)}</h3>
        <TraderStats trades={trades} />
      </Card>

      <div className="border-b border-gray-200">
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'trades' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('trades')}
            className="flex-1"
          >
            Trades
          </Button>
          <Button
            variant={activeTab === 'transactions' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('transactions')}
            className="flex-1"
          >
            Transactions
          </Button>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'trades' ? (
          <TraderTrades trades={trades} />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    </div>
  );
}