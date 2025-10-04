"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Expense, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const statusVariant = {
  pending: "default",
  approved: "secondary",
  rejected: "destructive",
} as const;

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "employeeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const expense = row.original;
      const users = (table.options.meta as { users: User[] })?.users || [];
      const user = users.find(u => u.id === expense.employeeId);
      
      return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{expense.employeeName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amountInCompanyCurrency",
    header: ({ column }) => {
      return (
        <div className="text-right">
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountInCompanyCurrency"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // Assuming company currency is USD for demo
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <span>{date.toLocaleDateString()}</span>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Expense["status"];
      return (
        <Badge variant={statusVariant[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(expense.id)}
            >
              Copy expense ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Approve</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
