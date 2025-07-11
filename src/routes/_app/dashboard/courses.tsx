import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/Courses/CourseCard";
import { coursesApi } from "@/api";

export const Route = createFileRoute("/_app/dashboard/courses")({
  head: () => ({
    meta: [
      { title: "Courses" },
      { name: "description", content: "View Courses" },
    ],
  }),
  component: Courses,
  loader: coursesApi.getAllCourses,
});

function Courses() {
  const { data: courses } = Route.useLoaderData();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">Courses</h1>
      </header>
      <section className="grid px-4 md:grid-cols-2 gap-3">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard {...course} key={course.code} />)
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
