import type { MetaFunction } from "@remix-run/node";
import Input from "../components/Input"; // Adjust the import path as necessary
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { loginUser } from "~/axios/User";
export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
  ];
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  const user: { email: string; password: string } = {
    email,
    password,
    // add other required fields if any
  };
  const response = await loginUser(user);
  // Perform login logic here (e.g., check credentials, create session, etc.)
  if (response.token) {
    sessionStorage.setItem("token", response.token);
  }
  // For now, we'll just redirect to a dashboard page
  return redirect("/dashboard");
};

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
        <section className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <Form>
            <div className="mb-4">

              <Input
                type="text"
                id="regNumber"
                name="regNumber"
                placeholder="Email address or Registration number"
                required
              />
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
            >
              Login
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
          <img className="w-3/5" alt="Studious students" src="/amico.png"></img>
        </section>
      </section>
    </main>
  );
}
