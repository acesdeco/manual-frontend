import logoImg from "@/assets/images/Union.png?url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Bell, Menu, Search } from "lucide-react";
import { useDashboard } from "./dashboard-shell";
import { UserNav } from "./user-nav";

export function DashboardHeader() {
  const { setSidebarOpen } = useDashboard();

  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <Link to="/dashboard/courses" className="flex items-center gap-2">
          <img src={logoImg} alt="Modools" className="h-8 w-auto" />
          <span className="hidden font-semibold md:inline-block">Modools</span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden flex-1 md:flex md:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-10"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="size-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Navigation */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
