import { Link, createFileRoute } from "@tanstack/react-router"
import { BookOpen } from "lucide-react"
import type { Course } from "@/schemas"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { studentOnlyFn } from "@/functions/global"
import { getStudentsEnrolledCoursesFn } from "@/functions/students/courses"
import { PageHeader } from "@/shared/components/layout"

export const Route = createFileRoute("/_app/dashboard/enrolled")({
  component: RouteComponent,
  beforeLoad: async () => await studentOnlyFn(),
  loader: async () => await getStudentsEnrolledCoursesFn(),
  head: () => ({
    meta: [
      { title: "My Enrolled Courses" },
      { name: "description", content: "View your enrolled courses" },
    ],
  }),
})

function RouteComponent() {
  const courses = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" description="Courses you've enrolled in" />
      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: Course) => (
            <Link
              key={course.code}
              to="/courses/$slug/introduction"
              params={{ slug: course.slug }}
              className="group block"
            >
              <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="min-h-[400px] border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookOpen />
            </EmptyMedia>
            <EmptyTitle>No enrolled courses yet</EmptyTitle>
            <EmptyDescription>
              Browse available courses and enroll to start learning.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link to="/dashboard/courses">Browse Courses</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
