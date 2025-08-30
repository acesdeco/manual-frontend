import { studentOnlyFn } from "@/functions/global";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/payment/$courseId")({
  component: Outlet,
  beforeLoad: async () => await studentOnlyFn(),
});
