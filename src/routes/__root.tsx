import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'
import appCss from '../styles.css?url'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { getThemeServerFn } from '@/lib/theme.ts'
import { ThemeToggle } from '@/components/theme-toggle.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async () => await getThemeServerFn(),
  component: RootComponent,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
})

function RootComponent() {
  const data = Route.useLoaderData()
  return (
    <ThemeProvider theme={data}>
      <RootDocument>
        <ThemeToggle />
        <Outlet />
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
        <Toaster />
      </RootDocument>
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = Route.useLoaderData()
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
