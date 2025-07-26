// TODO
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello &quot;/dashboard/courses&quot;!</div>
}
