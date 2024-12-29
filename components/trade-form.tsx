"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TradeFormProps {
  onClose: () => void;
}

export function TradeForm({ onClose }: TradeFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement trade submission logic
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Trade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" placeholder="BTC/USD" required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" placeholder="Long/Short" required />
          </div>
          <div>
            <Label htmlFor="entry">Entry Price</Label>
            <Input id="entry" type="number" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="exit">Exit Price</Label>
            <Input id="exit" type="number" step="0.01" />
          </div>
          <div>
            <Label htmlFor="size">Position Size</Label>
            <Input id="size" type="number" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" />
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