"use client";

import * as z from "zod";

export const tradeFormSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  type: z.enum(["long", "short"]),
  entryPrice: z.number().positive("Entry price must be positive"),
  exitPrice: z.number().positive("Exit price must be positive").optional(),
  size: z.number().positive("Size must be positive"),
  notes: z.string().optional(),
});

export type TradeFormSchema = z.infer<typeof tradeFormSchema>;