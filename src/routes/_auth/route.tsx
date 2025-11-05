import { redirectUsers } from "@/functions/global";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => await redirectUsers(),
});

function RouteComponent() {
  return (
    <main className="w-full /h-screen space-y-6 md:px-16 px-4 py-8 fade-in-bottom">
      <header>
        <h1 className="text-4xl font-bold mb-4">Modools</h1>
        <p className="text-lg text-muted-foreground">
          Modools
        </p>
      </header>
      <section className="h-full flex items-center justify-center [&_form]:space-y-4">
        <Outlet />
      </section>
    </main>
  );
}
