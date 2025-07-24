import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { cookieOptions } from "@/actions";
import { authApi, paymentsApi } from "@/api";
import { getCourse, type CourseId } from "@/api/courses";
import { getUserData } from "@/loaders";

const successFn = createServerFn({ method: "GET" })
  .validator(
    zodValidator(
      z.object({
        reference: z.string(),
        courseId: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    const [user, course, txState] = await Promise.all([
      getUserData(),
      getCourse(data.courseId as CourseId),
      paymentsApi.verifyPayment(data.reference),
    ]);
    if (txState.status === "success") {
      const newUser = await authApi.updateUser({
        data: {
          courses: [...(user.courses ?? []), data.courseId],
        },
        userId: user._id,
      });
      setCookie("user", JSON.stringify(newUser), {
        ...cookieOptions,
        expires: new Date(Date.now() + 1000 * cookieOptions.maxAge),
      });
    }
    return { course, txState };
  });

export const Route = createFileRoute("/_app/payment/$courseId/callback")({
  component: Callback,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps }) => {
    return await successFn({
      data: {
        courseId: params.courseId,
        reference: "reference" in deps ? deps.reference : deps.trxref,
      },
    });
  },
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
