import type { Route } from "./+types/dashboard.resources";

export const meta: Route.MetaFunction = () => {
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
