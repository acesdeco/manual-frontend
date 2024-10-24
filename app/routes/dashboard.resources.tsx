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
        <div className="text-gray-600">
            Resources
        </div>
    );
}