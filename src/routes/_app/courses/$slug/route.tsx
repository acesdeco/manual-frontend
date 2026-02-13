import {
  type ErrorComponentProps,
  Link,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { zodValidator } from "@tanstack/zod-adapter"
import { ArrowLeft, Menu } from "lucide-react"
import { useState } from "react"
import z from "zod"
import { coursesApi } from "@/api"
import logoImg from "@/assets/images/Union.png?url"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { WeekSidebar } from "@/features/courses/components"
import { authMiddleware } from "@/middleware"

const courseLoader = createServerFn({ method: "GET" })
  .inputValidator(
    zodValidator(
      z.object({
        slug: z.string(),
      }),
    ),
  )
  .middleware([authMiddleware])
  .handler(async ({ data: { slug }, context: { user } }) => {
    const [course, userCourses] = await Promise.all([
      coursesApi.getCourseBySlug(slug),
      coursesApi.getUsersEnrolledCourseIds(user.user),
    ])
    if (!userCourses.find((courseId) => course._id === courseId))
      return course._id + ":"
    return {
      course,
      studentInfo: {
        student_id: user.user,
        student_name: user.fullName,
        reg_number: user.registrationNumber,
      },
    }
  })

export const Route = createFileRoute("/_app/courses/$slug")({
  component: CourseLayout,
  pendingComponent: CourseLoadingState,
  errorComponent: NotEnrolled,
  loader: async ({ params }) => {
    const result = await courseLoader({
      data: params,
    })
    if (typeof result === "string") {
      throw new Error(result)
    }
    return result
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData?.course.title ?? `Course ${params.slug}` },
      { name: "description", content: "View course content" },
    ],
  }),
})

function CourseLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    </div>
  )
}

function NotEnrolled({ error }: ErrorComponentProps) {
  if (!error.message.endsWith(":")) throw error
  const courseId = error.message.slice(0, error.message.length - 1)

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Course Access Required</CardTitle>
          <CardDescription>
            You need to enroll in this course to access its content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Make a payment to unlock all course materials, including video
            lectures, notes, and assessments.
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button asChild className="w-full">
            <Link
              to="/payment/$courseId/pay"
              params={{ courseId }}
              mask={{ to: "/payment/$courseId/$", params: { courseId } }}
            >
              Proceed to Payment
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/dashboard/courses">Back to Courses</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function CourseLayout() {
  const { course } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="flex h-14 items-center gap-4 px-4 md:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo / Back */}
          <Link
            to="/dashboard/courses"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            <img src={logoImg} alt="Modools" className="h-6 w-auto" />
          </Link>

          {/* Course Title */}
          <div className="flex-1 truncate">
            <h1 className="truncate text-sm font-medium">{course.title}</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
          <WeekSidebar course={course} currentSlug={slug} />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <WeekSidebar course={course} currentSlug={slug} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
