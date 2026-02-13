import { createFileRoute } from "@tanstack/react-router"
import { getUserCookie } from "@/helpers/server/cookies"

export const Route = createFileRoute("/api/info")({
  server: {
    handlers: {
      GET: () => {
        return Response.json(getUserCookie())
      },
    },
  },
})
