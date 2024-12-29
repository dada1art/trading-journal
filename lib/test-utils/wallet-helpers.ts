import { PublicKey } from '@solana/web3.js';

export function createMockPublicKey(): PublicKey {
  return new PublicKey('11111111111111111111111111111111');
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}