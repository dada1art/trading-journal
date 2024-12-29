import { render, screen, fireEvent } from '@testing-library/react';
import { WalletStatus } from '@/components/wallet/wallet-status';
import { useWallet } from '@solana/wallet-adapter-react';
import { createMockPublicKey } from '@/lib/test-utils/wallet-helpers';

// Mock the wallet hook
jest.mock('@solana/wallet-adapter-react', () => ({
  useWallet: jest.fn(),
}));

describe('WalletStatus', () => {
  const mockPublicKey = createMockPublicKey();
  
  beforeEach(() => {
    (useWallet as jest.Mock).mockReturnValue({
      connected: true,
      publicKey: mockPublicKey,
      disconnect: jest.fn(),
    });
  });

  it('renders wallet address when connected', () => {
    render(<WalletStatus />);
    expect(screen.getByText('1111...1111')).toBeInTheDocument();
  });

  it('shows disconnect button when connected', () => {
    render(<WalletStatus />);
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });

  it('calls disconnect when button is clicked', () => {
    const mockDisconnect = jest.fn();
    (useWallet as jest.Mock).mockReturnValue({
      connected: true,
      publicKey: mockPublicKey,
      disconnect: mockDisconnect,
    });

    render(<WalletStatus />);
    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockDisconnect).toHaveBeenCalled();
  });
});