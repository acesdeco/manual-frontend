import { CourseVideo } from "@/features/courses/components";
import { studentOnlyFn } from "@/functions/global";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/courses/$slug/$week")({
  component: Week,
  beforeLoad: async () => await studentOnlyFn(),
  head: ({ params }) => ({
    meta: [
      { title: `Week ${+params.week + 1}` },
      { name: "description", content: "Weekly course content" },
    ],
  }),
});

const courseLayout = getRouteApi("/_app/courses/$slug");

function Week() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  const { week } = Route.useParams();

  // Get the week content - weeks can be an object or array
  const weeksData = course.weeks ?? {};
  const weekContent = Array.isArray(weeksData)
    ? weeksData[+week]
    : weeksData[week];

  if (!weekContent) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Week Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          This week&apos;s content is not available yet.
        </p>
      </div>
    );
  }

  return <CourseVideo user={studentInfo} content={weekContent} weekId={week} />;
}
