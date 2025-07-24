import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { coursesApi, paymentsApi } from "@/api";
import { getUserData } from "@/loaders";
import type { CourseId } from "@/api/courses";

const courseIdSchema = zodValidator(
  z.object({
    courseId: z.string(),
  }),
);

const checkExistingPaymentServerFn = createServerFn({ method: "GET" })
  .validator(courseIdSchema)
  .handler(async ({ data: { courseId } }) => {
    // check if already paid
    const user = await getUserData();
    if (user.courses?.includes(courseId)) {
      throw redirect({
        to: "/courses/$courseId",
        params: {
          courseId,
        },
      });
    }
  });

const courseLoader = createServerFn({ method: "GET" })
  .validator(courseIdSchema)
  .handler(async ({ data: { courseId } }) => {
    const [user, course] = await Promise.all([
      getUserData(),
      coursesApi.getCourse(courseId as CourseId),
    ]);
    const APP_URL =
      process.env.APP_URL ?? import.meta.baseURL ?? "http://localhost:5173";
    const transactionFee = course.coursePrice < 2500 ? 0 : 100;
    const charge = course.coursePrice * 0.015 + transactionFee;
    const cappedCharge = charge > 2000 ? 2000 : charge;
    const totalAmount = course.coursePrice + cappedCharge;
    const paymentData = await paymentsApi.initializePayment({
      courseId,
      amount: totalAmount,
      callback_url: `${APP_URL}/payment/${courseId}/success`,
      email: user.email,
      paymentDate: Date.now().toString(),
      status: "pending",
      userId: user._id,
    });
    return { course, cappedCharge, totalAmount, paymentData };
  });

export const Route = createFileRoute("/_app/payment/$courseId/pay")({
  component: Pay,
  beforeLoad: async ({ params }) => {
    await checkExistingPaymentServerFn({ data: params });
  },
  loader: async ({ params }) => await courseLoader({ data: params }),
});

function Pay() {
  const { course, cappedCharge, paymentData, totalAmount } =
    Route.useLoaderData();
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <header className="my-5">
        <h2 className="text-2xl font-bold mb-4">Course Payment</h2>
      </header>
      <section className="flex flex-col md:flex-row items-start gap-10 justify-around rounded-md border border-white p-4">
        <section className="w-full md:w-3/4">
          <img
            src={course.courseImage}
            alt={course.title}
            className="w-64 h-64 object-cover mb-4 rounded-md"
          />
          <p className="mb-4">
            You are about to pay for the course: <strong>{course.title}</strong>
          </p>
          <article>{course.description}</article>
          <span className="py-4">Taken by {course.instructor.name}</span>
        </section>

        <div className="flex flex-col h-full mb-4 w-full md:w-1/4">
          <div className="h-fit">
            <p className="py-2 flex justify-between">
              Course Price: <strong>N{course.coursePrice}</strong>
            </p>
            <p className="py-2 flex justify-between">
              Charges: <strong>N{cappedCharge.toFixed(2)}</strong>
            </p>
            <p className="py-2 flex justify-between">
              Total: <strong>N{totalAmount.toFixed(2)}</strong>
            </p>
          </div>
          <a
            href={paymentData.authorization_url}
            className="bg-blue-500 w-full  mt-5 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Proceed to Pay
          </a>
        </div>
      </section>
    </main>
  );
}
