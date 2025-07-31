import { CourseVideo } from "@/components/courses/course-video";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/courses/$courseId/introduction")({
  component: Introduction,
});

const courseLayout = getRouteApi("/_app/courses/$courseId");

function Introduction() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  return (
    <main className="bg-white w-full h-[90%] p-4 overflow-auto">
      <CourseVideo
        user={studentInfo}
        content={course.weeks[0] ?? course.weeks[1]}
        weekId={"1"}
      />
    </main>
  );
}
