import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import LessonComponent from "@/components/Courses/VideoComponent";

export const Route = createFileRoute("/_app/courses/$courseId/introduction")({
  component: Introduction,
});

const courseLayout = getRouteApi("/_app/courses/$courseId");

function Introduction() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  return (
    <main className="bg-white w-full h-[90%] p-4 overflow-auto">
      <LessonComponent
        user={studentInfo}
        content={{
          ...course.introduction,
          description: "Introduction to This Particular Course",
          topic: "Introductory Video",
        }}
      />
    </main>
  );
}
