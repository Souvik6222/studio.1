"use client";

import { DollarSign, Clock, Users, Receipt } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { expenses as mockExpenses, users as mockUsers } from "@/lib/data";
import { DataTable } from "../expenses/data-table";
import { columns } from "../expenses/columns";
import { User } from "@/lib/types";
import CategorySpendChart from "../reports/category-spend-chart";

export default function AdminView() {
  const totalSpend = mockExpenses.reduce((sum, e) => sum + e.amountInCompanyCurrency, 0);
  const totalPending = mockExpenses.filter(e => e.status === 'pending').length;
  const totalUsers = mockUsers.length;
  const totalExpenses = mockExpenses.length;

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Admin Overview</h2>
            <p className="text-muted-foreground">Manage and monitor all company-wide expense activities.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Company Spend"
          value={`$${totalSpend.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Pending Approvals"
          value={totalPending.toString()}
          icon={Clock}
        />
        <StatsCard
          title="Active Users"
          value={totalUsers.toString()}
          icon={Users}
        />
        <StatsCard
          title="Total Expenses"
          value={totalExpenses.toString()}
          icon={Receipt}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>All Company Expenses</CardTitle>
            <CardDescription>A complete log of all submitted expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={mockExpenses} users={mockUsers as User[]} />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
                <CardDescription>A breakdown of expenses across different categories.</CardDescription>
            </CardHeader>
            <CardContent>
                <CategorySpendChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
