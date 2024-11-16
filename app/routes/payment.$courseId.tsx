import {
  json,
  LoaderFunction,
  MetaFunction,
  // ActionFunction
} from "@remix-run/node";
import {
  // useLoaderData,
  useLoaderData,
  useNavigate,
  // useActionData
} from "@remix-run/react";
// import { useEffect } from "react";
import { getCourse } from "~/axios/Courses";
import { initializePayment, verifyTransaction } from "~/axios/Payment";
import { updateUser } from "~/axios/User";
import { user as userState } from "~/serverstate.server";
// Loader function to fetch course data
export const meta: MetaFunction = () => {
  return [
    { title: "Payment For Course" },
    { name: "description", content: "Pay for course" },
  ];
};
export const loader: LoaderFunction = async ({ params, request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  const { courseId } = params as { courseId: string };
  const url = new URL(request.url);
  const trxref = url.searchParams.get("trxref");
  const reference = url.searchParams.get("reference");
  const courseData = await getCourse(courseId);

  //check if the page is visited after a payment
  if (trxref || reference) {
    // Verify transaction
    const verifyTransactionData = await verifyTransaction(
      (trxref || reference) as string
    );
    if (verifyTransactionData.success) {
      if ("data" in verifyTransactionData) {
        // Redirect to course page
        if (verifyTransactionData.success) {
          console.log(cookie.user);
          const response = await updateUser({courses: [courseId, ...cookie.user.courses]}, cookie.user.user);
          console.log(response);
          if (response.success) {
            cookie.user = response.data;
          }
          await userState.serialize(cookie);
        }
        return json(
          {
            courseTransactionState: verifyTransactionData.data,
            courseData,
          },
          {
            headers: {
              "Set-Cookie": await userState.serialize(cookie),
            },
          }
        );
      }
    } else {
      return json({ courseData: verifyTransactionData.data });
    }
  }
  // // Fetch course data based on courseId 
  console.log("Course data:", courseData);
  if (
    courseData &&
    (cookie.user.courses === undefined ||
      cookie.user.courses?.includes(courseId) === false)
  ) {
    console.log(cookie.user);
    const APP_URL = process.env.APP_URL || "http://localhost:5173";
    const initializePaymentData = await initializePayment({
      courseId: courseId,
      amount: courseData.coursePrice * 100,
      callback_url: `${APP_URL}/payment/${courseId}`,
      email: cookie.user.email,
      paymentDate: Date.now().toString(),
      status: "pending",
      userId: cookie.user.user || cookie.user._id,
    });
    if (initializePaymentData.success) {
      if ("data" in initializePaymentData) {
        return json({ paymentData: initializePaymentData.data, courseData });
      }
    }
  }
  return json({ courseData, userHasPaid: true });
};

// UI Component
export default function PaymentPage() {
  const navigate = useNavigate();
  const { paymentData, courseData, courseTransactionState, userHasPaid } =
    useLoaderData<typeof loader>();
  if (courseTransactionState?.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="mb-4">
            Your payment for the {courseData.title} has been successfully
            processed.
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() =>
              navigate(`/courses/${courseData["_id"]}/introduction`)
            }
          >
            Go to Course
          </button>
        </div>
      </div>
    );
  } else if (courseTransactionState?.status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Payment Failed!</h2>
          <p className="mb-4">
            Your payment for the {courseData.title} has failed. Please try again
            later.
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => navigate(`payment/${courseData["_id"]}`)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (userHasPaid) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="mb-4">
            You have already paid for the course:{" "}
            <strong>{courseData.title}</strong>
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() =>
              navigate(`/courses/${courseData["_id"]}/introduction`)
            }
          >
            Go to Course
          </button>
        </div>
      </div>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <header className="my-5">
        <h2 className="text-2xl font-bold mb-4">Course Payment</h2>
      </header>
      <section className="flex flex-col md:flex-row items-start gap-10 justify-around rounded-md border border-white p-4">
        <section className="w-full md:w-3/4">
          <img
            src={courseData.courseImage}
            alt={courseData.title}
            className="w-64 h-64 object-cover mb-4 rounded-md"
          />
          <p className="mb-4">
            You are about to pay for the course:{" "}
            <strong>{courseData.title}</strong>
          </p>
          <article>{courseData.description}</article>
          <span className="py-4">Taken by {courseData.instructor.name}</span>
        </section>

        <div className="flex flex-col h-full mb-4 w-full md:w-1/4">
          <div className="h-fit">
            <p className="py-2 flex justify-between">
              Course Price: <strong>N{courseData.coursePrice}</strong>
            </p>
            <p className="py-2 flex justify-between">
              Charges:{" "}
              <strong>N{(courseData.coursePrice * 0.05).toFixed(2)}</strong>
            </p>
            <p className="py-2 flex justify-between">
              Total:{" "}
              <strong>N{(courseData.coursePrice * 1.05).toFixed(2)}</strong>
            </p>
          </div>

          <button
            className="bg-blue-500 w-full  mt-5 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() =>
              (window.location.href = paymentData.authorization_url)
            }
          >
            Proceed to Pay
          </button>
        </div>
      </section>
    </main>
  );
}
