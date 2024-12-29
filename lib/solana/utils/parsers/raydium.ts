import { ParsedInstruction } from '@solana/web3.js';
import { ParsedDexTrade } from '../types';
import { TOKEN_MINT_TO_SYMBOL } from '../../constants/markets';

export function parseRaydiumTrade(ix: ParsedInstruction): ParsedDexTrade | null {
  try {
    if (!ix.parsed || ix.program !== 'raydium') {
      return null;
    }

    const { type, info } = ix.parsed;

    if (!['swap', 'routeSwap'].includes(type)) {
      return null;
    }

    const inSymbol = TOKEN_MINT_TO_SYMBOL[info.inMint] || info.inMint;
    const outSymbol = TOKEN_MINT_TO_SYMBOL[info.outMint] || info.outMint;
    const symbol = `${inSymbol}/${outSymbol}`;

    const price = info.outAmount / info.inAmount;
    const side = info.inAmount > info.outAmount ? 'buy' : 'sell';

    return {
      dex: 'Raydium',
      side,
      price,
      size: parseFloat(info.inAmount),
      symbol,
      marketAddress: info.ammId || info.poolId
    };
  } catch (error) {
    console.error('Error parsing Raydium trade:', error);
    return null;
  }
}