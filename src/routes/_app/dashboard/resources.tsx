import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/resources")({
  head: () => ({
    meta: [
      { title: "Resources" },
      { name: "description", content: "View Courses" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <header className="mb-10">
      <h1 className="text-black text-2xl font-semibold">Resources</h1>
    </header>
  );
}
