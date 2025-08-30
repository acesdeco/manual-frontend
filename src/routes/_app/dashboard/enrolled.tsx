import { StudentsCourseCard } from "@/components/courses/course-card";
import Button from "@/components/global/button";
import { studentOnlyFn } from "@/functions/global";
import { getStudentsEnrolledCoursesFn } from "@/functions/students/courses";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/enrolled")({
  component: RouteComponent,
  beforeLoad: async () => await studentOnlyFn(),
  loader: async () => await getStudentsEnrolledCoursesFn(),
});

function RouteComponent() {
  const courses = Route.useLoaderData();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">My Courses</h1>
      </header>
      <section className="grid grid-cols-2 gap-3">
        {courses.length ? (
          courses.map((course) => (
            <StudentsCourseCard course={course} key={course.code} />
          ))
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
