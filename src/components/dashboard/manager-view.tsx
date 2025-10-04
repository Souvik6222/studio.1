"use client";

import { DollarSign, Clock, Users } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { expenses as mockExpenses, users as mockUsers } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { Expense, User } from "@/lib/types";
import { DataTable } from "../expenses/data-table";
import { columns } from "../expenses/columns";
import { Button } from "../ui/button";

export default function ManagerView() {
  const { user } = useAuth();
  
  const teamMemberIds = mockUsers.filter(u => u.managerId === user?.id).map(u => u.id);
  const teamExpenses = mockExpenses.filter(e => teamMemberIds.includes(e.employeeId));
  const pendingApprovals = mockExpenses.filter(e => e.status === 'pending' && e.approverStage === 1); // Simple logic for demo

  const totalTeamSpend = teamExpenses.reduce((sum, e) => sum + e.amountInCompanyCurrency, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Manager Dashboard</h2>
            <p className="text-muted-foreground">Oversee your team's expenses and approvals.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Team Spend"
          value={`$${totalTeamSpend.toFixed(2)}`}
          icon={DollarSign}
          description="Sum of all team expenses"
        />
        <StatsCard
          title="Pending Approvals"
          value={pendingApprovals.length.toString()}
          icon={Clock}
          description="Expenses awaiting your review"
        />
        <StatsCard
          title="Team Members"
          value={teamMemberIds.length.toString()}
          icon={Users}
          description="Employees you manage"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Expenses</CardTitle>
              <CardDescription>All expenses submitted by your team members.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={teamExpenses} users={mockUsers as User[]} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pending Your Approval</CardTitle>
              <CardDescription>Review and act on these expenses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.length > 0 ? (
                pendingApprovals.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{expense.employeeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category}: ${expense.amount.toFixed(2)} {expense.currency}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No pending approvals.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
