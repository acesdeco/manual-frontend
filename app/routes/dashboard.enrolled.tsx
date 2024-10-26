//import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
    return [
      { title: "Your courses" },
      { name: "description", content: "View Courses" },
    ];
  };
export default function dashboard() {
    return (
      <>
         <header className="mb-10">
            <h1 className="text-black text-2xl font-semibold">
                My Courses
            </h1>
        </header>
      </>
    );
}