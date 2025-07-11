import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { coursesApi } from "@/api";
import { iUserSchema } from "@/api/auth";
import Button from "@/components/Button";
import { CourseCard } from "@/components/Courses/CourseCard";

const enrolledCoursesLoader = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = iUserSchema.parse(JSON.parse(getCookie("user")!));
    return await coursesApi.getCoursesByUserId(user._id);
  }
);

export const Route = createFileRoute("/_app/dashboard/enrolled")({
  head: () => ({
    meta: [
      { title: "Your courses" },
      { name: "description", content: "View Courses" },
    ],
  }),
  component: Enrolled,
  loader: async () => await enrolledCoursesLoader(),
});

function Enrolled() {
  const courses = Route.useLoaderData();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">My Courses</h1>
      </header>
      <section className="grid grid-cols-2 gap-3">
        {courses.length ? (
          courses.map((course) => <CourseCard {...course} key={course.code} />)
        ) : (
          <div className="text-gray-500 col-span-2 text-center">
            <p>You haven&apos;t enrolled for any courses yet.</p>
            <Link
              to="/dashboard/courses"
              from={Route.fullPath}
              className="w-fit"
            >
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
