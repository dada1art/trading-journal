"use client";

import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import { Trade } from '@/lib/types/trade';
import { parseTradeFromTransaction } from '../utils/transaction-parser';

const BATCH_SIZE = 25;
const MAX_SIGNATURES = 1000;

export function useTraderAnalysis(address: string) {
  const { connection } = useConnection();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let controller = new AbortController();

    const fetchTraderData = async () => {
      if (!address) return;

      try {
        setLoading(true);
        setError(null);

        const pubKey = new PublicKey(address);
        const signatures = await connection.getSignaturesForAddress(
          pubKey,
          { limit: MAX_SIGNATURES },
          { signal: controller.signal }
        );

        const allTrades: Trade[] = [];
        
        // Process in batches to avoid rate limits
        for (let i = 0; i < signatures.length; i += BATCH_SIZE) {
          if (!mounted || controller.signal.aborted) return;

          const batch = signatures.slice(i, i + BATCH_SIZE);
          const transactions = await Promise.all(
            batch.map(sig => 
              connection.getParsedTransaction(sig.signature, {
                maxSupportedTransactionVersion: 0
              })
            )
          );

          const batchTrades = transactions
            .filter(tx => tx !== null)
            .map(tx => parseTradeFromTransaction(tx!, address))
            .filter((trade): trade is Trade => trade !== null);

          allTrades.push(...batchTrades);

          // Update progress
          if (mounted) {
            setTrades(current => [...current, ...batchTrades]);
          }
        }

        if (mounted) {
          // Final update with all trades
          setTrades(allTrades);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;

        const error = err as Error;
        if (mounted) {
          setError(error);
          toast({
            title: "Error fetching trader data",
            description: error.message,
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchTraderData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [address, connection, toast]);

  return { trades, loading, error };
}