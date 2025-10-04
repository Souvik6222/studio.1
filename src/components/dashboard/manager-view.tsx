"use client";

import { DollarSign, Clock, Users, MoreHorizontal } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { expenses as mockExpenses, users as mockUsers } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { Expense, User } from "@/lib/types";
import { DataTable } from "../expenses/data-table";
import { columns } from "../expenses/columns";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function ManagerView() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [expenses, setExpenses] = React.useState<Expense[]>(mockExpenses);
  
  const teamMemberIds = mockUsers.filter(u => u.managerId === user?.id).map(u => u.id);
  const teamExpenses = expenses.filter(e => teamMemberIds.includes(e.employeeId));
  const pendingApprovals = expenses.filter(e => e.status === 'pending' && teamMemberIds.includes(e.employeeId) && e.approverStage === 1); // Simple logic for demo

  const totalTeamSpend = teamExpenses.reduce((sum, e) => sum + e.amountInCompanyCurrency, 0);

  const handleExpenseUpdate = (expenseId: string, status: 'approved' | 'rejected') => {
    setExpenses(prevExpenses => {
        return prevExpenses.map(expense => {
            if (expense.id === expenseId) {
                return { ...expense, status: status, approverStage: expense.approverStage + 1 };
            }
            return expense;
        });
    });
    toast({
        title: `Expense ${status}`,
        description: `The expense has been successfully ${status}.`,
    });
  };

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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExpenseUpdate(expense.id, 'approved')}>Approve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExpenseUpdate(expense.id, 'rejected')} className="text-destructive">Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
