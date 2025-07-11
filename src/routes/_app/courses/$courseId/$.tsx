import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/courses/$courseId/$")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/courses/$courseId/introduction",
      params: params,
    });
  },
});
