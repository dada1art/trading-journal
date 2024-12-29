"use client";

import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';

export function useAddressLookup(address: string) {
  const { connection } = useConnection();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;

      try {
        setLoading(true);
        const pubKey = new PublicKey(address);
        const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 100 });
        
        const txDetails = await Promise.all(
          signatures.map(async (sig) => {
            const tx = await connection.getTransaction(sig.signature, {
              maxSupportedTransactionVersion: 0,
            });
            return {
              signature: sig.signature,
              timestamp: sig.blockTime ? sig.blockTime * 1000 : Date.now(),
              ...tx,
            };
          })
        );

        setTransactions(txDetails);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast({
          title: "Error fetching transactions",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address, connection, toast]);

  return { transactions, loading, error };
}