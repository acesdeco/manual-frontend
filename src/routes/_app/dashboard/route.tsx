import { DashboardShell } from "@/features/dashboard/components";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard" },
      { name: "description", content: "Manage your courses" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { role } = Route.useRouteContext();

  return (
    <DashboardShell role={role}>
      <Outlet />
    </DashboardShell>
  );
}
