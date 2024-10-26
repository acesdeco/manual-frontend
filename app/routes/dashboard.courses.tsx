//import { Link } from "@remix-run/react";
import {  
  // LoaderFunctionArgs, 
  type MetaFunction } from "@remix-run/node";
import { json, useLoaderData, 
  // useOutletContext 
} from "@remix-run/react";
import { CourseCard } from "~/components/Courses/CourseCard";
import { getAllCourses } from "~/axios/Courses";
export const meta: MetaFunction = () => {
    return [
      { title: "Courses" },
      { name: "description", content: "View Courses" },
    ];
  };

export default function Dashboard() {
    // const user = useOutletContext();
    const {courses} = useLoaderData<typeof loader>();
    return (
        <>
        <header className="mb-10">
            <h1 className="text-black text-2xl font-semibold">
                Courses
            </h1>
        </header>
        <section className="grid grid-cols-2 gap-3">
            {courses.map((course, y) => <CourseCard key={y} course={course}></CourseCard>)}
        </section>
        </>
    );
}


export async function loader(
  // {
  //   request,
  // }: LoaderFunctionArgs
) {
    const data = await getAllCourses();
    // const cookie = request.headers.get("Cookie");
    return json({ courses: data });
  }
  