"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/test-utils/wallet-helpers";
import { useToast } from "@/hooks/use-toast";

export function WalletStatus() {
  const { connected, publicKey, disconnect } = useWallet();
  const { toast } = useToast();

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Wallet disconnected",
        description: "Successfully disconnected wallet",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  if (!connected || !publicKey) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {shortenAddress(publicKey.toString())}
      </span>
      <Button variant="outline" size="sm" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </div>
  );
}