"use client";

import { useNews } from "@/lib/api/news";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function NewsSection() {
  const { news, loading } = useNews();

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Loading news...</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">No news available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id} className="p-4 hover:bg-accent transition-colors">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium line-clamp-2">{item.title}</h3>
              <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.source}</span>
              <span>{formatDate(new Date(item.publishedAt).getTime())}</span>
            </div>
          </a>
        </Card>
      ))}
    </div>
  );
}