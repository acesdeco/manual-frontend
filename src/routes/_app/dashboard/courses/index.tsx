import { coursesApi } from "@/api";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/features/courses/components";
import { iGetCoursesByUserFn } from "@/functions/courses";
import { PageHeader } from "@/shared/components/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

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
          title: isInstructor ? "My Courses" : "Courses",
        },
        { name: "description", content: "View and manage courses" },
      ],
    };
  },
});

function RouteComponent() {
  const { role, courses } = Route.useLoaderData();
  const isInstructor = role === "instructor";

  return (
    <div className="space-y-6">
      <PageHeader
        title={isInstructor ? "My Courses" : "Courses"}
        description={
          isInstructor
            ? "Manage your created courses"
            : "Browse available courses"
        }
        actions={
          isInstructor && (
            <Button asChild>
              <Link to="/dashboard/courses/new">
                <Plus className="mr-2 size-4" />
                Create Course
              </Link>
            </Button>
          )
        }
      />
      <CourseList courses={courses} role={role} />
    </div>
  );
}
