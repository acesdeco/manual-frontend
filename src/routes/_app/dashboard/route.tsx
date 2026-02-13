import { Outlet, createFileRoute } from "@tanstack/react-router"
import { DashboardShell } from "@/features/dashboard/components"

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard" },
      { name: "description", content: "Manage your courses" },
    ],
  }),
  component: DashboardLayout,
})

function DashboardLayout() {
  const { role } = Route.useRouteContext()

  return (
    <DashboardShell role={role}>
      <Outlet />
    </DashboardShell>
  )
}
