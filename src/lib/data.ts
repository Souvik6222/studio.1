import type { User, Expense, ApprovalWorkflow } from './types';

export const users: User[] = [
  {
    id: 'user_admin_1',
    name: 'Admin User',
    email: 'admin@expens.eye',
    role: 'admin',
    avatarUrl: 'https://picsum.photos/seed/1/100/100',
  },
  {
    id: 'user_manager_1',
    name: 'Manager Mike',
    email: 'mike.manager@expens.eye',
    role: 'manager',
    avatarUrl: 'https://picsum.photos/seed/2/100/100',
  },
  {
    id: 'user_employee_1',
    name: 'Employee Emily',
    email: 'emily.employee@expens.eye',
    role: 'employee',
    managerId: 'user_manager_1',
    avatarUrl: 'https://picsum.photos/seed/3/100/100',
  },
  {
    id: 'user_employee_2',
    name: 'Employee Bob',
    email: 'bob.employee@expens.eye',
    role: 'employee',
    managerId: 'user_manager_1',
    avatarUrl: 'https://picsum.photos/seed/4/100/100',
  },
  {
    id: 'user_finance_1',
    name: 'Finance Fiona',
    email: 'fiona.finance@expens.eye',
    role: 'manager',
    avatarUrl: 'https://picsum.photos/seed/5/100/100',
  },
];

const today = new Date();
const getDate = (daysAgo: number) => new Date(today.setDate(today.getDate() - daysAgo)).toISOString();

export const expenses: Expense[] = [
  {
    id: 'exp_1',
    employeeId: 'user_employee_1',
    employeeName: 'Employee Emily',
    amount: 150.75,
    currency: 'USD',
    amountInCompanyCurrency: 150.75,
    category: 'Travel',
    description: 'Flight to conference',
    date: getDate(2),
    receiptUrl: 'https://picsum.photos/seed/receipt1/400/600',
    status: 'pending',
    approverStage: 1,
    approvalHistory: [],
    createdAt: getDate(2),
  },
  {
    id: 'exp_2',
    employeeId: 'user_employee_1',
    employeeName: 'Employee Emily',
    amount: 45.50,
    currency: 'USD',
    amountInCompanyCurrency: 45.50,
    category: 'Food',
    description: 'Team lunch',
    date: getDate(5),
    receiptUrl: 'https://picsum.photos/seed/receipt2/400/600',
    status: 'approved',
    approverStage: 2,
    approvalHistory: [{ approverId: 'user_manager_1', status: 'approved' }],
    createdAt: getDate(5),
  },
  {
    id: 'exp_3',
    employeeId: 'user_employee_2',
    employeeName: 'Employee Bob',
    amount: 800,
    currency: 'EUR',
    amountInCompanyCurrency: 880,
    category: 'Rent',
    description: 'Office space rent',
    date: getDate(10),
    receiptUrl: 'https://picsum.photos/seed/receipt3/400/600',
    status: 'rejected',
    approverStage: 1,
    approvalHistory: [{ approverId: 'user_manager_1', status: 'rejected', comment: 'Exceeds budget' }],
    createdAt: getDate(10),
  },
  {
    id: 'exp_4',
    employeeId: 'user_employee_1',
    employeeName: 'Employee Emily',
    amount: 29.99,
    currency: 'USD',
    amountInCompanyCurrency: 29.99,
    category: 'Software',
    description: 'Monthly design tool subscription',
    date: getDate(15),
    receiptUrl: 'https://picsum.photos/seed/receipt4/400/600',
    status: 'approved',
    approverStage: 2,
    approvalHistory: [{ approverId: 'user_manager_1', status: 'approved' }],
    createdAt: getDate(15),
  },
  {
    id: 'exp_5',
    employeeId: 'user_employee_2',
    employeeName: 'Employee Bob',
    amount: 250,
    currency: 'GBP',
    amountInCompanyCurrency: 315,
    category: 'Travel',
    description: 'Train tickets for client visit',
    date: getDate(1),
    receiptUrl: 'https://picsum.photos/seed/receipt5/400/600',
    status: 'pending',
    approverStage: 1,
    approvalHistory: [],
    createdAt: getDate(1),
  },
];

export const approvalWorkflow: ApprovalWorkflow = {
  steps: [
    { level: 1, approverId: 'user_manager_1' },
    { level: 2, approverId: 'user_finance_1' }
  ],
  condition: {
    rule: 'hybrid',
    percentage: 60,
    specificApproverId: 'user_finance_1'
  }
};
