import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import Input from "../components/Input"; // Adjust the import path as necessary
import { Form } from "@remix-run/react";
import { createUser, IUser } from "~/axios/User";

export const meta: MetaFunction = () => {
  return [
    { title: "Create account" },
    { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
  ];
};


export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const formInfo = Object.fromEntries(data);
  const user: IUser = {
    email: formInfo.email as string,
    password: formInfo.password as string,
    firstName: formInfo.firstName as string,
    lastName: formInfo.lastName as string,
    // add other required fields if any
  };
  const response = await createUser(user);
  return response;
}


export default function Index() {
  return (
    <main className="w-full h-screen flex flex-col md:px-16 px-4 py-8 fade-in-bottom">
      <header>
        <h1 className="text-4xl font-bold mb-4">CPE Lab</h1>
        <p className="text-lg text-gray-600">
          Welcome to Computer Engineering UNIUYO
        </p>
      </header>
      <section className="h-full flex flex-row items-center justify-center">
        <section className="md:w-1/2 h-full pt-10">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <Form key={"signup_form"} id="signup-form" method="post">
            <div className="mb-4">
              <label
                htmlFor="regNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Number
              </label>
              <Input
                type="text"
                id="regNumber"
                name="regNumber"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </Form>
        </section>
        <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
          <img className="w-3/5" alt="Studious students" src="/Illustration.png"></img>
        </section>
      </section>
    </main>
  );
}
