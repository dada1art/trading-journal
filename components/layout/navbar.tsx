"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletStatus } from "@/components/wallet/wallet-status";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trading Journal</h1>
        <div className="flex items-center gap-4">
          <WalletStatus />
          <WalletMultiButton />
        </div>
      </div>
    </nav>
  );
}