import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center md:px-16 px-4 py-8">
      <header>
        <h1 className="text-4xl text-center font-bold mb-4">CPE Lab</h1>
        <p className="text-lg text-center text-foreground">
         Welcome to Modools
        </p>
        <p className="text-center space-x-4">
          <Link to="/login" from={Route.fullPath}>
            Log In?
          </Link>
          <Link to="/signup" from={Route.fullPath}>
            Sign Up?
          </Link>
        </p>
      </header>
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </main>
  )
}
