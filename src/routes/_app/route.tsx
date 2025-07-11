import { createFileRoute, Outlet } from "@tanstack/react-router";
import { redirectGuest } from "@/loaders";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => await redirectGuest(),
  component: () => <Outlet />,
});
