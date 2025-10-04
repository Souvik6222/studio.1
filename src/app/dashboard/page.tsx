"use client";

import { useAuth } from "@/hooks/use-auth";
import AdminView from "@/components/dashboard/admin-view";
import ManagerView from "@/components/dashboard/manager-view";
import EmployeeView from "@/components/dashboard/employee-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  switch (user.role) {
    case "admin":
      return <AdminView />;
    case "manager":
      return <ManagerView />;
    case "employee":
      return <EmployeeView />;
    default:
      return <div>Invalid user role.</div>;
  }
}
