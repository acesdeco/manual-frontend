import { type ReactNode, createContext, useContext, useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import type { UserRole } from "@/schemas"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardContextValue {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  role: UserRole
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardShell")
  }
  return context
}

interface DashboardShellProps {
  children: ReactNode
  role: UserRole
}

export function DashboardShell({ children, role }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DashboardContext value={{ sidebarOpen, setSidebarOpen, role }}>
      <div className="flex min-h-screen flex-col bg-background">
        <DashboardHeader />
        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
            <DashboardSidebar />
          </aside>

          {/* Mobile Sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-64 p-0">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main
            className={cn(
              "flex-1 overflow-auto p-4 md:p-6 lg:p-8",
              "bg-muted/30",
            )}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </DashboardContext>
  )
}
