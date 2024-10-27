//import { Link } from "@remix-run/react";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCoursesByUserId, ICourse } from "~/axios/Courses";
import Button from "~/components/Button";
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
  const { courses } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">My Courses</h1>
      </header>
      <section className="grid grid-cols-2 gap-3">
        {courses &&
          courses.length !== 0 &&
          courses.map((course, y) => (
            <CourseCard key={y} course={course}></CourseCard>
          ))}
        {(!courses || courses.length === 0) && (
          <div className="text-gray-500 col-span-2 text-center">
            <p>You haven&apos;t enrolled for any courses yet.</p>
            <Link to={`/dashboard/courses`} className="w-fit">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  const enrolledCourses = await getCoursesByUserId(cookie.user.user);
  if (enrolledCourses.success === false) {
    return json({ courses: [] });
  }
  return json({ courses: enrolledCourses?.data as ICourse[] });
}
