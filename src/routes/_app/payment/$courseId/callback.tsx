import { paymentCallbackFn } from "@/functions/payments/students";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const Route = createFileRoute("/_app/payment/$courseId/callback")({
  component: Callback,
  validateSearch: zodValidator(
    z
      .object({
        trxref: z.string(),
      })
      .or(
        z.object({
          reference: z.string(),
        }),
      ),
  ),
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => {
    return paymentCallbackFn({
      data: {
        courseId: params.courseId,
        reference: "reference" in deps ? deps.reference : deps.trxref,
      },
    });
  },
});

function Callback() {
  const { course, txState } = Route.useLoaderData();
  switch (txState.status) {
    case "success": {
      return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="mb-4">
              Your payment for the {course.title} has been successfully
              processed.
            </p>
            <Link
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              to="/courses/$courseId/introduction"
              from={Route.fullPath}
            >
              Go to Course
            </Link>
          </div>
        </div>
      );
    }
    case "failed": {
      return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Payment Failed!</h2>
            <p className="mb-4">
              Your payment for the {course.title} has failed. Please try again
              later.
            </p>
            <Link
              to="/payment/$courseId/pay"
              from={Route.fullPath}
              mask={{
                to: "/payment/$courseId/$",
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Retry
            </Link>
          </div>
        </div>
      );
    }
  }
}
