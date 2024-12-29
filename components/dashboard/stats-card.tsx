"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Icon className="text-primary h-5 w-5" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}