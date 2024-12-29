"use client";

import { render, screen } from '@testing-library/react';
import { Dashboard } from '@/components/dashboard';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrades } from '@/lib/solana/hooks/useTrades';

jest.mock('@solana/wallet-adapter-react');
jest.mock('@/lib/solana/hooks/useTrades');

describe('Dashboard', () => {
  beforeEach(() => {
    (useTrades as jest.Mock).mockReturnValue({
      trades: [],
      loading: false,
    });
  });

  it('shows connect wallet message when not connected', () => {
    (useWallet as jest.Mock).mockReturnValue({
      connected: false,
    });

    render(<Dashboard />);
    expect(screen.getByText(/connect your wallet/i)).toBeInTheDocument();
  });

  it('shows dashboard content when connected', () => {
    (useWallet as jest.Mock).mockReturnValue({
      connected: true,
    });

    render(<Dashboard />);
    expect(screen.getByText(/recent trades/i)).toBeInTheDocument();
  });
});