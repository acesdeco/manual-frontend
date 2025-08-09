import { CourseVideo } from "@/components/courses/course-video";
import { studentOnlyFn } from "@/functions/global";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/courses/$slug/$week")({
  component: Week,
  beforeLoad: async () => await studentOnlyFn(),
});

const courseLayout = getRouteApi("/_app/courses/$slug");

function Week() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  const { week } = Route.useParams();
  return (
    <main className="bg-white w-full h-[90%] p-4 overflow-auto">
      <CourseVideo
        user={studentInfo}
        // TODO
        // @ts-expect-error we shall revisit this
        content={course.weeks[+week]}
        weekId={week}
      />
    </main>
  );
}
