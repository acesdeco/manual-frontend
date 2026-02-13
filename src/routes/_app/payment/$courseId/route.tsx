import { Outlet, createFileRoute } from "@tanstack/react-router"
import { studentOnlyFn } from "@/functions/global"

export const Route = createFileRoute("/_app/payment/$courseId")({
  component: Outlet,
  beforeLoad: async () => await studentOnlyFn(),
})
