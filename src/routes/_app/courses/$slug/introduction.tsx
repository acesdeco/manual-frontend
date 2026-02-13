import { createFileRoute, getRouteApi } from "@tanstack/react-router"
import { Suspense } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Route = createFileRoute("/_app/courses/$slug/introduction")({
  component: Introduction,
  head: () => ({
    meta: [
      { title: "Course Introduction" },
      { name: "description", content: "Course introduction and overview" },
    ],
  }),
})

const courseLayout = getRouteApi("/_app/courses/$slug")

function Introduction() {
  const { course } = courseLayout.useLoaderData()

  return (
    <div className="space-y-6">
      {/* Video Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {course.introduction?.topic || "Course Introduction"}
        </h2>
        <p className="text-muted-foreground">
          Welcome to {course.title}. Start your learning journey here.
        </p>
      </div>

      {/* Video Player */}
      {course.introduction?.video && (
        <Card className="overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={course.introduction.video}
              title={course.introduction.topic || "Introduction"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        </Card>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>
                Important information about this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              {course.introduction?.notes ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {course.introduction.notes}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No notes available for the introduction.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discussion and questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No comments yet. Be the first to start a discussion!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="mt-4">
          <Suspense fallback={<AssessmentsSkeleton />}>
            {/* Note: Introduction doesn't have a weekId, this component needs adjustment */}
            <Card>
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
                <CardDescription>
                  Test your understanding of the course material
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete the course introduction to unlock assessments.
                </p>
              </CardContent>
            </Card>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AssessmentsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </CardContent>
    </Card>
  )
}
