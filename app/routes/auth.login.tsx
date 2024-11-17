import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import Input from "../components/Input"; // Adjust the import path as necessary
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { IUser, loginUser } from "~/axios/User";
import { user as userState } from "~/serverstate.server";
import { validateRegNumber } from "~/utils/utils";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
  ];
};
type ActionData = {
  validationErrors?: { [key: string]: string };
  data?: IUser;
  responseError?: {
    success: boolean;
    message: string;
    details?: {
      code: number;
      message: string;
      details?: string;
    };
  };
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const registrationNumber = formData.get("regNumber") as string;
  const validationErrors: { [key: string]: string } = {};

  if (validateRegNumber(registrationNumber) === false) {
    validationErrors.regNumber = "Invalid Registration Number";
  }
  if (Object.keys(validationErrors).length > 0) {
    return json({ validationErrors });
  }
  const user: { registrationNumber: string; password: string; role: string } = {
    registrationNumber,
    password,
    role: "student",
    // add other required fields if any
  };
  const response = await loginUser(user);
  if (response.success && "data" in response) {
    console.log(response);
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userState.parse(cookieHeader)) || {};
    cookie.user = response.data;
    return redirect("/dashboard/courses", {
      headers: {
        "Set-Cookie": await userState.serialize(cookie),
      },
    });
  }
  if (!response.success) {
    console.log(response);
    return json({ responseError: { ...response } });
  }
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (actionData?.responseError) {
      setIsSubmitting(false);
      setModalOpen(true);
    }
    if (actionData?.validationErrors) {
      setIsSubmitting(false);
    }
  }, [actionData]);
  return (
    <>
      {actionData?.responseError && modalOpen && (
        <div className="fixed h-screen z-50 w-screen inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white w-1/2 absolute p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-600">Error</h2>
            <p className="text-sm text-gray-600">
              {actionData.responseError.details?.message ||
                actionData.responseError.message}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <main className="w-full h-screen flex flex-col md:px-16 px-4 py-8 fade-in-bottom">
        <header>
          <h1 className="text-4xl font-bold mb-4">CPE Lab</h1>
          <p className="text-lg text-gray-600">
            Welcome to Computer Engineering UNIUYO
          </p>
        </header>
        <section className="h-full flex flex-row items-center justify-center">
          <section className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <Form key={"login_form"} id="login-form" method="post">
              <div className="mb-4">
                <Input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  placeholder="Registration number"
                  required
                />
                {actionData?.validationErrors?.regNumber ? (
                  <span className="text-sm text-red-700">
                    {actionData?.validationErrors.regNumber}
                  </span>
                ) : null}
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsSubmitting(true)}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Log in"
                )}
              </button>

              <p className="mt-2 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
            </Form>
          </section>
          <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
            <img
              className="w-3/5"
              alt="Studious students"
              src="/amico.png"
            ></img>
          </section>
        </section>
      </main>
    </>
  );
}
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  if (cookie.user) {
    return redirect("/dashboard/courses");
  }
  return null;
};
