"use client";

import { useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // TODO: Implement real news API integration
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'Solana Reaches New Milestone in DeFi',
            summary: 'The Solana blockchain has achieved a significant milestone in DeFi adoption...',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: 'Crypto News'
          },
          {
            id: '2',
            title: 'Market Analysis: Crypto Trading Volumes Surge',
            summary: 'Trading volumes across major cryptocurrency exchanges have seen a substantial increase...',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: 'Trading View'
          }
        ];
        setNews(mockNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading };
}