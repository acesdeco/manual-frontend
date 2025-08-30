import {
  checkExistingPaymentFn,
  coursePaymentDetailsFn,
} from "@/functions/payments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/payment/$courseId/pay")({
  component: Pay,
  beforeLoad: async ({ params }) => {
    await checkExistingPaymentFn({ data: params });
  },
  loader: async ({ params }) =>
    await coursePaymentDetailsFn({
      data: params,
    }),
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
