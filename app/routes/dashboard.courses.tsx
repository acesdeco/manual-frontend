import { useLoaderData } from "react-router";
import { getAllCourses, type ICourse } from "~/axios/Courses";
import { CourseCard } from "~/components/Courses/CourseCard";
import type { Route } from "./+types/dashboard.courses";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Courses" },
    { name: "description", content: "View Courses" },
  ];
};

export default function Dashboard() {
  const { courses } = useLoaderData<typeof loader>();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">Courses</h1>
      </header>
      <section className="grid px-4 md:grid-cols-2 gap-3">
        {courses.length > 0 ? (
          courses.map((course, y) => (
            <CourseCard key={y} course={course}></CourseCard>
          ))
        ) : (
          <div className=" col-span-2 text-center flex flex-col items-center">
            <img alt="Courses not found" src="/public/notfound.png"></img>
            <p className="text-gray-900 text-xl font-medium">
              No courses available
            </p>
            {/* <span className="text-gray-800 mb-2">Create your first course and start inspiring minds. Tap Create Course to Begin</span> */}
          </div>
        )}
      </section>
    </>
  );
}

export async function loader() {
  const data = await getAllCourses();
  if (data.success === false) {
    return { courses: [] };
  }
  return {
    courses: data?.data!.filter(
      (course: ICourse) => course.published === true
    ) as ICourse[],
  };
}
