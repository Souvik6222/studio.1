"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // In a real app, this check would be more robust, probably in middleware.
    // For this simulation, a simple effect is sufficient.
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  if (!isAuthenticated) {
    // Show a loading/skeleton state while authentication is being checked
    return (
      <div className="flex min-h-screen w-full">
        <div className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex p-2 gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
             <Skeleton className="h-8 w-8 sm:hidden" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Skeleton className="h-64 w-full" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
