import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import LessonComponent from "@/components/Courses/VideoComponent";

export const Route = createFileRoute("/_app/courses/$courseId/$week")({
  component: Week,
});

const courseLayout = getRouteApi("/_app/courses/$courseId");

function Week() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  const { week } = Route.useParams();
  return (
    <main className="bg-white w-full h-[90%] p-4 overflow-auto">
      <LessonComponent user={studentInfo} content={course.weeks[+week]} />
    </main>
  );
}
