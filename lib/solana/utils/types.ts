export interface ParsedDexTrade {
  dex: 'Openbook' | 'Raydium' | 'Orca';
  side: 'buy' | 'sell' | 'unknown';
  price: number;
  size: number;
  symbol: string;
  marketAddress: string;
}

export interface ParsedTokenTransfer {
  type: 'transfer';
  amount: number;
  fromAddress: string;
  toAddress: string;
  mint: string;
}

export interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
}