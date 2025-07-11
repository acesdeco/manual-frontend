import { createFileRoute, Outlet } from "@tanstack/react-router";
import { redirectUser } from "@/loaders";

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => await redirectUser(),
  component: () => <Outlet />,
});
