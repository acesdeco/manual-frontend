//import { Link } from "@remix-run/react";
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCourses, ICourse } from "~/axios/Courses";
import { CourseCard } from "~/components/Courses/CourseCard";
// import { useOutletContext } from "@remix-run/react";
import { user as userState } from "~/serverstate.server";
export const meta: MetaFunction = () => {
    return [
      { title: "Your courses" },
      { name: "description", content: "View Courses" },
    ];
  };
export default function Enrolled() {
  // const user = useOutletContext();
  const {courses} = useLoaderData<typeof loader>();
    return (
      <>
         <header className="mb-10">
            <h1 className="text-black text-2xl font-semibold">
                My Courses
            </h1>
        </header>
        <section className="grid grid-cols-2 gap-3">
            {courses.map((course, y) => <CourseCard key={y} course={course}></CourseCard>)}
        </section>
      </>
    );
}

export async function loader(
  {
    request,
  }: LoaderFunctionArgs
) {
    const data = await getAllCourses();
    let enrolledCourses: ICourse[] = [];
    const cookieHeader = request.headers.get('Cookie');
    const cookie = (await userState.parse(cookieHeader)) || {};
    if(cookie.user.courses){
        enrolledCourses = 
        data.filter(course => cookie.user.courses.includes(course._id));
    }
    return json({ courses: enrolledCourses });
  }
  