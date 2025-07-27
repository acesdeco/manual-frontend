import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/create-course')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/_app/dashboard/create-course&quot;!</div>
}
