import { redirectUsers } from "@/functions/global";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => await redirectUsers(),
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-primary">Modools</h1>
            <p className="text-xs text-muted-foreground">
              Learning Management System
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}
