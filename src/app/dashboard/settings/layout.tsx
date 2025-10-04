"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const navItems = [
    { name: "Employees", href: "/dashboard/settings/employees" },
    { name: "Workflow", href: "/dashboard/settings/workflow" },
  ]

  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Settings</h2>
            <p className="text-muted-foreground">Manage your company settings, users, and approval workflows.</p>
        </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2",
                  pathname === item.href
                    ? "bg-accent"
                    : "hover:bg-transparent hover:underline"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
