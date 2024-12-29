import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function calculatePnL(entryPrice: number, exitPrice: number, size: number, type: 'long' | 'short'): number {
  const difference = exitPrice - entryPrice;
  return type === 'long' ? difference * size : -difference * size;
}