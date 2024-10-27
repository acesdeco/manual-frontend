//import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "Resources" },
    { name: "description", content: "View Courses" },
  ];
};
export default function dashboard() {
  return (
    <header className="mb-10">
      <h1 className="text-black text-2xl font-semibold">Resources</h1>
    </header>
  );
}
