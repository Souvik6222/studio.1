"use client";

import { useState } from "react";
import { DollarSign, Clock, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { expenses as mockExpenses, users } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { Expense, User } from "@/lib/types";
import { DataTable } from "../expenses/data-table";
import { columns } from "../expenses/columns";
import { ExpenseFormSheet } from "../expenses/expense-form-sheet";
import { runSpendingTips } from "@/lib/actions";
import { Skeleton } from "../ui/skeleton";

export default function EmployeeView() {
  const { user } = useAuth();
  const [userExpenses, setUserExpenses] = useState<Expense[]>(
    mockExpenses.filter((e) => e.employeeId === user?.id)
  );
  const [aiTips, setAiTips] = useState<string | null>(null);
  const [isLoadingTips, setIsLoadingTips] = useState(false);

  const stats = userExpenses.reduce(
    (acc, expense) => {
      acc.total += expense.amountInCompanyCurrency;
      if (expense.status === "pending") acc.pending += 1;
      if (expense.status === "approved") acc.approved += 1;
      if (expense.status === "rejected") acc.rejected += 1;
      return acc;
    },
    { total: 0, pending: 0, approved: 0, rejected: 0 }
  );

  const handleNewExpense = (newExpense: Expense) => {
    setUserExpenses((prev) => [newExpense, ...prev]);
  };
  
  const getAiSpendingTips = async () => {
    setIsLoadingTips(true);
    setAiTips(null);
    const expenseHistory = userExpenses.map(e => `${e.date}: $${e.amount} on ${e.category} - ${e.description}`).join('\n');
    const result = await runSpendingTips({ expenseHistory });
    if (result.success && result.data) {
      setAiTips(result.data.spendingTips);
    } else {
      setAiTips("Could not generate tips at this moment. Please try again later.");
    }
    setIsLoadingTips(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome, {user?.name}!</h2>
            <p className="text-muted-foreground">Here's a summary of your expense activities.</p>
        </div>
        <div className="flex items-center space-x-2">
          <ExpenseFormSheet onExpenseAdded={handleNewExpense} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Submitted"
          value={`$${stats.total.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatsCard title="Pending" value={stats.pending.toString()} icon={Clock} />
        <StatsCard title="Approved" value={stats.approved.toString()} icon={CheckCircle} />
        <StatsCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your last 5 submitted expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={userExpenses.slice(0, 5)} users={users as User[]} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-yellow-400" />
                <CardTitle>AI Spending Tips</CardTitle>
              </div>
              <Button onClick={getAiSpendingTips} disabled={isLoadingTips} size="sm">
                {isLoadingTips ? 'Generating...' : 'Get Tips'}
              </Button>
            </div>
            <CardDescription>Let AI analyze your spending and provide personalized tips.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {isLoadingTips && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            )}
            {aiTips && (
              <div className="text-sm text-muted-foreground whitespace-pre-line bg-muted/50 p-4 rounded-lg">
                {aiTips}
              </div>
            )}
            {!aiTips && !isLoadingTips && (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    Click "Get Tips" to see your personalized advice.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
