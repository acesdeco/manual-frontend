import { getUserData } from '@/functions/global'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => await getUserData(),
  component: Outlet,
})
