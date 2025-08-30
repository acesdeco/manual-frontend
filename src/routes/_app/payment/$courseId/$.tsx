import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/payment/$courseId/$")({
  beforeLoad: ({ params }) => {
     
    throw redirect({
      params,
      to: "/payment/$courseId/pay",
      mask: {
        to: "/payment/$courseId/$",
        params,
      },
    });
  },
});
