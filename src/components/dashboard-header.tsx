import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Eye } from "lucide-react";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 font-semibold">
              <Eye className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">ExpensEye</span>
            </div>
          </div>
          <DashboardSidebar isMobile={true} />
        </SheetContent>
      </Sheet>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Future search bar can go here */}
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
