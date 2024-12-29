import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { PROGRAM_IDS } from '../constants/programs';
import { parseOpenbookTrade } from './parsers/openbook';
import { parseRaydiumTrade } from './parsers/raydium';
import { parseTokenTransfer } from './parsers/token';
import { Trade } from '@/lib/types/trade';
import { ParsedDexTrade, TokenBalance } from './types';

export function parseTradeFromTransaction(
  tx: ParsedTransactionWithMeta,
  walletAddress: string
): Trade | null {
  try {
    if (!tx.meta || tx.meta.err || !tx.blockTime) {
      return null;
    }

    const instructions = tx.transaction.message.instructions;
    
    // Try to parse as DEX trade
    for (const ix of instructions) {
      let parsedTrade: ParsedDexTrade | null = null;

      switch (ix.programId.toString()) {
        case PROGRAM_IDS.OPENBOOK:
          parsedTrade = parseOpenbookTrade(ix);
          break;
        case PROGRAM_IDS.RAYDIUM:
          parsedTrade = parseRaydiumTrade(ix);
          break;
      }

      if (parsedTrade) {
        const pnl = calculatePnL(tx.meta.preBalances, tx.meta.postBalances, walletAddress);
        
        return {
          id: tx.transaction.signatures[0],
          timestamp: tx.blockTime * 1000,
          symbol: parsedTrade.symbol,
          type: parsedTrade.side === 'buy' ? 'long' : 'short',
          entryPrice: parsedTrade.price,
          size: parsedTrade.size,
          walletAddress,
          pnl
        };
      }
    }

    // Try to parse as token transfer
    const tokenTransfers = instructions
      .filter(ix => ix.programId.toString() === PROGRAM_IDS.TOKEN)
      .map(ix => parseTokenTransfer(ix))
      .filter(transfer => transfer !== null);

    if (tokenTransfers.length > 0) {
      // Process token transfers...
      return null; // For now, we'll focus on DEX trades
    }

    return null;
  } catch (error) {
    console.error('Error parsing transaction:', error);
    return null;
  }
}

function calculatePnL(
  preBalances: number[],
  postBalances: number[],
  walletAddress: string
): number | undefined {
  try {
    const walletIndex = preBalances.findIndex((_, i) => 
      postBalances[i] !== preBalances[i]
    );

    if (walletIndex === -1) return undefined;

    const difference = (postBalances[walletIndex] - preBalances[walletIndex]) / 1e9;
    return difference;
  } catch (error) {
    console.error('Error calculating P&L:', error);
    return undefined;
  }
}