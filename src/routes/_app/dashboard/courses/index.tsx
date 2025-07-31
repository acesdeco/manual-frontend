import { coursesApi } from "@/api";
import {
  InstructorCourseCard,
  StudentsCourseCard,
} from "@/components/courses/course-card";
import Button from "@/components/global/button";
import { iGetCoursesByUserFn } from "@/functions/instructor/courses";
import { createFileRoute, Link } from "@tanstack/react-router";
import notFoundImg from "@/assets/images/notfound.png";
import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";

export const Route = createFileRoute("/_app/dashboard/courses/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const courses =
      context.role === "instructor"
        ? await iGetCoursesByUserFn()
        : await coursesApi.getAllCourses();
    return { role: context.role, courses };
  },
  head: ({ loaderData }) => {
    const isInstructor = loaderData?.role === "instructor";
    return {
      meta: [
        {
          title: clsx(isInstructor && "Your", "Courses"),
        },
        { name: "description", content: "View Courses" },
      ],
    };
  },
});

function RouteComponent() {
  const { role, courses } = Route.useLoaderData();
  return (
    <>
      <header className="mb-10">
        <h1 className="text-black text-2xl font-semibold">
          {role === "instructor" && "My"} Courses
        </h1>
      </header>
      <section className="grid grid-cols-2 gap-3">
        {courses.length > 0 ? (
          courses.map((course) => {
            const Card =
              role === "instructor" ? InstructorCourseCard : StudentsCourseCard;
            return <Card course={course} key={course._id} />;
          })
        ) : (
          <div className="col-span-2 text-center flex flex-col items-center">
            <img alt="Courses not found" src={notFoundImg} />
            <p className="text-gray-900 text-xl font-medium">
              {role === "instructor"
                ? "Your classroom awaits."
                : "No courses available"}
            </p>
            {role === "instructor" && (
              <Fragment>
                <span className="text-gray-800 mb-2">
                  Create your first course and start inspiring minds. Tap Create
                  Course to Begin
                </span>
                <Link
                  to="/dashboard/courses/new"
                  className="w-fit"
                  mask={{
                    to: ".",
                  }}
                >
                  <Button>Create Course</Button>
                </Link>
              </Fragment>
            )}
          </div>
        )}
      </section>
    </>
  );
}
