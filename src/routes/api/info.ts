import { getUserCookie } from "@/helpers/server/cookies";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/info").methods({
  GET: () => {
    return Response.json(getUserCookie());
    // return Response.json(JSON.parse(getCookie("user")!));
  },
});
