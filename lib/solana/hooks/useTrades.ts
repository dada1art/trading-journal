"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Trade } from "@/lib/types/trade";
import { useToast } from "@/hooks/use-toast";

export function useTrades() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setTrades([]);
      setLoading(false);
      return;
    }

    const fetchTrades = async () => {
      try {
        setLoading(true);
        // TODO: Implement actual Solana trade fetching
        const mockTrades: Trade[] = [
          {
            id: "1",
            symbol: "SOL/USD",
            type: "long",
            entryPrice: 100,
            exitPrice: 110,
            size: 10,
            pnl: 100,
            timestamp: Date.now(),
            walletAddress: publicKey.toBase58(),
          },
        ];
        setTrades(mockTrades);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast({
          title: "Error fetching trades",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [publicKey, connection, toast]);

  return { trades, loading, error };
}