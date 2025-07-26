import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  // TODO redirect if authenticated
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full h-screen flex flex-col md:px-16 px-4 py-8 fade-in-bottom">
      <header>
        <h1 className="text-4xl font-bold mb-4">CPE Lab</h1>
        <p className="text-lg text-gray-600">
          Welcome to Computer Engineering UNIUYO
        </p>
      </header>
      <section className="h-full flex flex-row items-center justify-center">
        <Outlet />
      </section>
    </main>
  )
}
