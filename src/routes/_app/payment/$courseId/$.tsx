import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/payment/$courseId/$")({
  beforeLoad: ({ params }) => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
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
