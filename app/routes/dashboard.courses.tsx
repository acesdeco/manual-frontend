//import { Link } from "@remix-run/react";
import {  
  // LoaderFunctionArgs, 
  type MetaFunction } from "@remix-run/node";
import { json, useLoaderData, 
  // useOutletContext 
} from "@remix-run/react";
import { CourseCard } from "~/components/Courses/CourseCard";
import { getAllCourses, ICourse } from "~/axios/Courses";
// import Button from "~/components/Button";
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
        <section className="grid px-4 md:grid-cols-2 gap-3">
          {courses.length > 0 ? 
            courses.map((course, y) => <CourseCard key={y} course={course}></CourseCard>)
          :
          <div className=" col-span-2 text-center flex flex-col items-center">
          <img alt="Courses not found" src="/public/notfound.png"></img>
          <p className="text-gray-900 text-xl font-medium">Courses not found</p>
          {/* <span className="text-gray-800 mb-2">Create your first course and start inspiring minds. Tap Create Course to Begin</span> */}
        </div>
          }
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
    if (data.success === false) {
      return json({ courses: [] });
    }
    return json({ courses: data?.data as ICourse[] });
  }
  