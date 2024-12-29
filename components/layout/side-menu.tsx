"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { isValidPublicKey } from '@/lib/test-utils/wallet-helpers';
import { useToast } from '@/hooks/use-toast';
import { TraderAnalysis } from '@/components/analysis/trader-analysis';
import { IconButton } from '@/components/ui/icon-button';

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [activeAddress, setActiveAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPublicKey(address)) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Solana address",
        variant: "destructive",
      });
      return;
    }
    setActiveAddress(address);
  };

  return (
    <>
      <div className="fixed right-0 top-20 z-40">
        <IconButton
          icon={isOpen ? X : Search}
          onClick={() => setIsOpen(!isOpen)}
          label={isOpen ? 'Close trader analysis' : 'Open trader analysis'}
          className="w-8 h-8 p-0"
        />
      </div>

      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-background border-l transform transition-transform duration-200 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Trader Analysis</h2>
          
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Solana address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <IconButton
                icon={Search}
                onClick={() => {}}
                label="Search trader"
                size="icon"
                type="submit"
              />
            </div>
          </form>

          {activeAddress && (
            <TraderAnalysis address={activeAddress} />
          )}
        </div>
      </div>
    </>
  );
}