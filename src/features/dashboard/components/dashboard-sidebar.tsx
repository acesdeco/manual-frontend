import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Bell, BookOpen, FolderOpen, GraduationCap, Home } from "lucide-react";
import { useDashboard } from "./dashboard-shell";

interface NavItem {
  label: string;
  to: string;
  icon: typeof BookOpen;
  role: "all" | "student" | "instructor";
}

const navItems: NavItem[] = [
  {
    label: "Home",
    to: "/dashboard/home",
    icon: Home,
    role: "all",
  },
  {
    label: "Courses",
    to: "/dashboard/courses",
    icon: BookOpen,
    role: "all",
  },
  {
    label: "Enrolled",
    to: "/dashboard/enrolled",
    icon: GraduationCap,
    role: "student",
  },
  {
    label: "Resources",
    to: "/dashboard/resources",
    icon: FolderOpen,
    role: "student",
  },
  {
    label: "Notifications",
    to: "/dashboard/notifications",
    icon: Bell,
    role: "instructor",
  },
];

export function DashboardSidebar() {
  const { role, setSidebarOpen } = useDashboard();
  const location = useLocation();

  const filteredItems = navItems.filter(
    (item) => item.role === "all" || item.role === role,
  );

  return (
    <ScrollArea className="h-full py-6">
      <div className="px-3">
        <h2 className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
        </h2>
        <nav className="flex flex-col gap-1">
          {filteredItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}
