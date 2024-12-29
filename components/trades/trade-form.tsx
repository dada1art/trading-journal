"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { TradeFormData } from "@/lib/types/trade";

interface TradeFormProps {
  onClose: () => void;
}

export function TradeForm({ onClose }: TradeFormProps) {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TradeFormData>({
    symbol: "",
    type: "long",
    entryPrice: 0,
    size: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setLoading(true);
    try {
      // TODO: Implement Solana transaction
      console.log("Submitting trade:", formData);
    } catch (error) {
      console.error("Error submitting trade:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Trade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              placeholder="SOL/USD"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'long' | 'short') => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              step="0.00000001"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exitPrice">Exit Price (Optional)</Label>
            <Input
              id="exitPrice"
              type="number"
              step="0.00000001"
              value={formData.exitPrice || ""}
              onChange={(e) => setFormData({ ...formData, exitPrice: parseFloat(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Position Size</Label>
            <Input
              id="size"
              type="number"
              step="0.00000001"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Trade"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}