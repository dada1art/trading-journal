"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Brain, Newspaper } from "lucide-react";
import { useState } from "react";
import { TradeForm } from "@/components/trades/trade-form";
import { TradeList } from "@/components/trades/trade-list";
import { NewsSection } from "@/components/news/news-section";
import { AIInsights } from "@/components/ai/ai-insights";
import { TradeStats } from "@/components/analytics/trade-stats";
import { PerformanceChart } from "@/components/analytics/performance-chart";
import { useTrades } from "@/lib/solana/hooks/useTrades";

export function Dashboard() {
  const { connected } = useWallet();
  const { trades } = useTrades();
  const [showTradeForm, setShowTradeForm] = useState(false);

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome to Trading Journal</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to access your trading journal.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TradeStats trades={trades} />
      </div>

      <div className="mb-8">
        <PerformanceChart trades={trades} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Trades</h2>
              <Button onClick={() => setShowTradeForm(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Trade
              </Button>
            </div>
            <TradeList />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Newspaper className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">Market News</h2>
            </div>
            <NewsSection />
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">AI Insights</h2>
            </div>
            <AIInsights />
          </Card>
        </div>
      </div>

      {showTradeForm && (
        <TradeForm onClose={() => setShowTradeForm(false)} />
      )}
    </div>
  );
}