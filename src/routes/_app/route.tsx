import { getUserData, redirectGuests } from "@/functions/global";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    await redirectGuests();
    return await getUserData();
  },
});
