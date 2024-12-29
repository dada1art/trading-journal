"use client";

import { render, screen } from '@testing-library/react';
import { TradeList } from '@/components/trades/trade-list';
import { useTrades } from '@/lib/solana/hooks/useTrades';
import { createMockTrade } from '@/lib/test-utils/trade-helpers';

jest.mock('@/lib/solana/hooks/useTrades');

describe('TradeList', () => {
  it('shows loading state', () => {
    (useTrades as jest.Mock).mockReturnValue({
      trades: [],
      loading: true,
    });

    render(<TradeList />);
    expect(screen.getByText(/loading trades/i)).toBeInTheDocument();
  });

  it('renders trades correctly', () => {
    const mockTrades = [
      createMockTrade({ symbol: 'SOL/USD', type: 'long' }),
      createMockTrade({ symbol: 'BTC/USD', type: 'short' }),
    ];

    (useTrades as jest.Mock).mockReturnValue({
      trades: mockTrades,
      loading: false,
    });

    render(<TradeList />);
    expect(screen.getByText('SOL/USD')).toBeInTheDocument();
    expect(screen.getByText('BTC/USD')).toBeInTheDocument();
  });
});