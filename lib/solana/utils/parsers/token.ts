import { ParsedInstruction } from '@solana/web3.js';
import { ParsedTokenTransfer } from '../types';

export function parseTokenTransfer(ix: ParsedInstruction): ParsedTokenTransfer | null {
  try {
    if (!ix.parsed || ix.program !== 'spl-token') {
      return null;
    }

    const { type, info } = ix.parsed;

    if (type !== 'transfer') {
      return null;
    }

    return {
      type: 'transfer',
      amount: parseFloat(info.amount),
      fromAddress: info.source,
      toAddress: info.destination,
      mint: info.mint
    };
  } catch (error) {
    console.error('Error parsing token transfer:', error);
    return null;
  }
}