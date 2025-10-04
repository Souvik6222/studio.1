"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { expenses as mockExpenses, users as mockUsers } from '@/lib/data';
import { Expense, User } from '@/lib/types';
import { DataTable } from '@/components/expenses/data-table';
import { columns } from '@/components/expenses/columns';
import { ExpenseFormSheet } from '@/components/expenses/expense-form-sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExpensesPage() {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState(mockExpenses);

    const getVisibleExpenses = () => {
        if (!user) return [];
        switch (user.role) {
            case 'admin':
                return expenses;
            case 'manager':
                const teamMemberIds = mockUsers.filter(u => u.managerId === user.id).map(u => u.id);
                return expenses.filter(e => teamMemberIds.includes(e.employeeId));
            case 'employee':
                return expenses.filter(e => e.employeeId === user.id);
            default:
                return [];
        }
    };

    const visibleExpenses = getVisibleExpenses();
    
    const handleExpenseAdded = (newExpense: Expense) => {
        setExpenses(prev => [newExpense, ...prev]);
    }

    const pageTitle = {
        admin: 'All Company Expenses',
        manager: 'Your Team\'s Expenses',
        employee: 'My Expenses',
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">{user ? pageTitle[user.role] : 'Expenses'}</CardTitle>
                        <CardDescription>View, search, and manage expenses.</CardDescription>
                    </div>
                    {user?.role === 'employee' && (
                        <ExpenseFormSheet onExpenseAdded={handleExpenseAdded}/>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={visibleExpenses} users={mockUsers as User[]} />
            </CardContent>
        </Card>
    );
}
