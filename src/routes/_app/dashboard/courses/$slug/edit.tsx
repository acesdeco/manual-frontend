import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/courses/$slug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /_app/dashboard/courses/$slug/edit!</div>
}
