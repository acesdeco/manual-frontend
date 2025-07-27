// TODO

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/courses/$slug/introduction')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello &quot;/_app/_students/courses/$slug/introduction&quot;!</div>
  )
}
