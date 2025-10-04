export type UserRole = "admin" | "manager" | "employee";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  managerId?: string;
};

export type Expense = {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  currency: string;
  amountInCompanyCurrency: number;
  category: "Travel" | "Food" | "Rent" | "Software" | "Other";
  description: string;
  date: string; // ISO string
  receiptUrl: string;
  status: ApprovalStatus;
  approverStage: number;
  approvalHistory: { approverId: string; status: ApprovalStatus; comment?: string }[];
  createdAt: string; // ISO string
};

export type ApprovalRule = 'percentage' | 'specific_approver' | 'hybrid';

export type ApprovalWorkflow = {
  steps: { level: number, approverId: string }[];
  condition: {
    rule: ApprovalRule;
    percentage?: number;
    specificApproverId?: string;
  }
};
