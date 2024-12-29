"use client";

import { render, screen, fireEvent } from '@testing-library/react';
import { TradeForm } from '@/components/trades/trade-form';
import { useWallet } from '@solana/wallet-adapter-react';
import { createMockPublicKey } from '@/lib/test-utils/wallet-helpers';

jest.mock('@solana/wallet-adapter-react');

describe('TradeForm', () => {
  const mockOnClose = jest.fn();
  const mockPublicKey = createMockPublicKey();

  beforeEach(() => {
    (useWallet as jest.Mock).mockReturnValue({
      publicKey: mockPublicKey,
    });
  });

  it('renders all form fields', () => {
    render(<TradeForm onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/symbol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/entry price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position size/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<TradeForm onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText(/add trade/i));
    
    expect(await screen.findByText(/symbol is required/i)).toBeInTheDocument();
  });
});