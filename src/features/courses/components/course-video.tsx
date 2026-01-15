import AllAssessments from "@/components/assments/all-assessment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Week } from "@/schemas";
import type { Student } from "@/types";
import { Suspense } from "react";

interface CourseVideoProps {
  content: Week;
  user: Student;
  weekId: Week["_id"];
}

export function CourseVideo({ content, user, weekId }: CourseVideoProps) {
  return (
    <div className="space-y-6">
      {/* Video Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {content.topic || "Introductory Video"}
        </h2>
        <p className="text-muted-foreground">
          Introduction to this course module
        </p>
      </div>

      {/* Video Player */}
      <Card className="overflow-hidden">
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={content.video}
            title={content.topic}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          />
        </div>
      </Card>

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
              <CardTitle>Lecture Notes</CardTitle>
              <CardDescription>Key points from this module</CardDescription>
            </CardHeader>
            <CardContent>
              {content.notes ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {content.notes}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No notes available for this module.
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
            <AllAssessments user={user} weekId={weekId} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
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
  );
}

export { CourseVideo as default };
