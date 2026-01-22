import { createFileRoute } from "@tanstack/react-router"
import { getUserData, redirectGuests } from "@/functions/global"

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    await redirectGuests()
    const data = await getUserData()
    return data
  },
})
