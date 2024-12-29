import { ParsedInstruction } from '@solana/web3.js';
import { ParsedDexTrade } from '../types';
import { MARKET_ADDRESS_TO_SYMBOL } from '../../constants/markets';

export function parseOpenbookTrade(ix: ParsedInstruction): ParsedDexTrade | null {
  try {
    if (!ix.parsed || ix.program !== 'serum') {
      return null;
    }

    const { type, info } = ix.parsed;

    if (!['matchOrders', 'newOrder', 'consumeEvents'].includes(type)) {
      return null;
    }

    const marketAddress = info.market || info.marketAddress;
    const symbol = MARKET_ADDRESS_TO_SYMBOL[marketAddress] || marketAddress;

    return {
      dex: 'Openbook',
      side: info.side || info.makerSide || 'unknown',
      price: parseFloat(info.price || '0'),
      size: parseFloat(info.size || info.quantity || '0'),
      symbol,
      marketAddress
    };
  } catch (error) {
    console.error('Error parsing Openbook trade:', error);
    return null;
  }
}