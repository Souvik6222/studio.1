"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Home,
  Package2,
  Receipt,
  Settings,
  Users,
  Eye,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

type DashboardSidebarProps = {
  isMobile?: boolean;
};

export function DashboardSidebar({ isMobile = false }: DashboardSidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", roles: ["admin", "manager", "employee"] },
    { href: "/dashboard/expenses", icon: Receipt, label: "Expenses", roles: ["admin", "manager", "employee"] },
    { href: "/dashboard/reports", icon: BarChart2, label: "Reports", roles: ["admin", "manager"] },
    { href: "/dashboard/settings/employees", icon: Users, label: "Employees", roles: ["admin"] },
    { href: "/dashboard/settings/workflow", icon: Settings, label: "Workflow", roles: ["admin"] },
  ];

  const filteredNavItems = navItems.filter(item => user && item.roles.includes(user.role));

  const renderLink = (item: typeof navItems[0], isCollapsed: boolean) => {
    const isActive = pathname === item.href;
    const linkClasses = cn(
      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
      { "bg-accent text-accent-foreground": isActive }
    );
    const mobileLinkClasses = cn(
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
        { "bg-accent text-accent-foreground": isActive }
    );

    if (isMobile) {
        return (
            <Link key={item.href} href={item.href} className={mobileLinkClasses}>
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
        )
    }

    return (
      <TooltipProvider key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.href} className={linkClasses}>
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  if (isMobile) {
    return (
        <nav className="grid gap-2 text-lg font-medium p-4">
            {filteredNavItems.map(item => renderLink(item, false))}
        </nav>
    )
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Eye className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">ExpensEye</span>
        </Link>
        {filteredNavItems.map(item => renderLink(item, true))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {/* Additional items like settings can go here if not role-specific for bottom */}
      </nav>
    </aside>
  );
}
