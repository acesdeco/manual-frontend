import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "CPE Lab" },
    { name: "description", content: "Welcome to Computer Engineering UNIUYO" },
  ];
};
export default function Index() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center md:px-16 px-4 py-8">
      <header>
        <h1 className="text-4xl text-center font-bold mb-4">CPE Lab</h1>
        <p className="text-lg text-center text-gray-600">
          Welcome to Computer Engineering UNIUYO
        </p>
      </header>
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </main>
  );
}
import { LoaderFunction, redirect } from "@remix-run/node";
import { user as userState } from "~/serverstate.server";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('Cookie');
    const cookie = (await userState.parse(cookieHeader)) || {};
    console.log(cookie);
  if (cookie.user) {
    return redirect("/dashboard/courses");
  } else {
    return redirect("/auth/login");
  }
};
