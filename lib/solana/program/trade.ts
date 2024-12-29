import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface TradeAccount {
  symbol: string;
  tradeType: number; // 0 for long, 1 for short
  entryPrice: anchor.BN;
  exitPrice: anchor.BN | null;
  size: anchor.BN;
  notes: string;
  timestamp: anchor.BN;
  owner: PublicKey;
}

export const TRADE_ACCOUNT_DISCRIMINATOR = Buffer.from([
  97, 101, 140, 124, 102, 109, 111, 116, // Custom discriminator for trade accounts
]);

export const TRADE_ACCOUNT_SIZE = 1000; // Adjust based on actual data size needed