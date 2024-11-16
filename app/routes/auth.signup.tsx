import type {
  MetaFunction,
  ActionFunctionArgs,
  LoaderFunction,
} from "@remix-run/node";
import Input from "../components/Input"; // Adjust the import path as necessary
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { createUser, IUser } from "~/axios/User";
import { validateEmail, validateRegNumber } from "~/utils/utils";
import { useEffect, useState } from "react";
import { user as userState } from "~/serverstate.server";
type ActionData = {
  validationErrors?: { [key: string]: string };
  data?: IUser;
  responseError?: {
    success: boolean;
    message: string;
    details?: {
      code: number;
      message: string;
    };
  };
};
export const meta: MetaFunction = () => {
  return [
    { title: "Create account" },
    { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const formInfo = Object.fromEntries(data);
  const regNumber = formInfo.regNumber as string;
  const email = formInfo.email as string;
  const validationErrors: { [key: string]: string } = {};

  if (validateRegNumber(regNumber) === false) {
    validationErrors.regNumber = "Invalid Registration Number";
  }
  if (!validateEmail(email)) {
    validationErrors.email = "Invalid email address";
  }
  if (formInfo.password !== formInfo.confirmPassword) {
    validationErrors.confirmPassword = "Passwords do not match";
  }
  if (Object.keys(validationErrors).length > 0) {
    return json({ validationErrors });
  }
  const user: IUser = {
    email,
    password: formInfo.confirmPassword as string,
    firstName: formInfo.firstName as string,
    lastName: formInfo.lastName as string,
    registrationNumber: regNumber,
    role: "student",
    // add other required fields if any
  };
  const response = await createUser(user);
  if (response.success && "data" in response) {
    return redirect("/auth/login");
  }
  if (!response.success) {
    return json({ responseError: { ...response } });
  }
  return response;
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
          <section className="md:w-1/2 w-full h-full pt-10">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <Form key={"signup_form"} id="signup-form" method="post">
              <div className="justify-between flex gap-4 md:gap-6 lg:gap-10 w-full">
                <div className="w-full">
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <Input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  placeholder="Registration Number"
                  required
                />
                {actionData?.validationErrors?.regNumber ? (
                  <span className="text-sm text-red-700">
                    {actionData?.validationErrors.regNumber}
                  </span>
                ) : null}
              </div>

              <div className="mb-4">
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  required
                />
                {actionData?.validationErrors?.email ? (
                  <span className="text-sm text-red-700">
                    {actionData?.validationErrors.email}
                  </span>
                ) : null}
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
                {actionData?.validationErrors?.confirmPassword ? (
                  <span className="text-sm text-red-700">
                    {actionData?.validationErrors.confirmPassword}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                formMethod="post"
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
                  "Create Account"
                )}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log In
                </a>
              </p>
            </Form>
          </section>
          <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
            <img
              className="w-3/5"
              alt="Studious students"
              src="/Illustration.png"
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
