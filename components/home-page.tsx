"use client";

import { Navbar } from "@/components/layout/navbar";
import { Dashboard } from "@/components/dashboard";
import { SideMenu } from "@/components/layout/side-menu";
import { ErrorBoundary } from "@/components/error-boundary";

export default function HomePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Dashboard />
        <SideMenu />
      </main>
    </ErrorBoundary>
  );
}