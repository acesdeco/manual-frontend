import { coursesApi } from "@/api";
import type { UpdateWeek } from "@/api/courses";
import logoImg from "@/assets/images/Union.png?url";
import { Assessment } from "@/components/assments/assessments";
import CourseEditor from "@/components/courses/course-editor";
import { SubmissionFlow } from "@/components/submissions/submission-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { instructorOnlyFn } from "@/functions/global";
import { cn } from "@/lib/utils";
import { assessmentByWeekOptions } from "@/queries";
import { OverlayLoader } from "@/shared/components/feedback";
import { responseErrorToast } from "@/utils/client";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ArrowLeft, ChevronDown, Loader2, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/_app/dashboard/courses/$slug/edit")({
  validateSearch: zodValidator(
    z.object({
      week: z
        .number()
        .positive()
        .catch(1)
        .optional()
        .transform((val) => val ?? 1),
    }),
  ),
  component: RouteComponent,
  beforeLoad: async () => await instructorOnlyFn(),
  loader: async ({ params }) => {
    const course = await coursesApi.getCourseBySlug(params.slug);
    const weeks = await coursesApi.getWeeksByCourseId(course._id);
    return { course, weeks };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Edit: ${loaderData?.course.title ?? "Course"}` },
      { name: "description", content: "Edit course content" },
    ],
  }),
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { queryClient } = Route.useRouteContext();

  const { course, weeks } = Route.useLoaderData();
  const { week: weekSearchParam } = Route.useSearch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weeksExpanded, setWeeksExpanded] = useState(true);

  const activeWeek = useMemo(() => {
    const newWeek = weeks[weekSearchParam - 1] ?? null;
    if (newWeek) {
      void queryClient.prefetchQuery(assessmentByWeekOptions(newWeek._id));
    }
    return newWeek;
  }, [queryClient, weekSearchParam, weeks]);

  const { mutate: togglePublish, isPending: isTogglingPublish } = useMutation({
    mutationFn: async () => {
      await coursesApi.updateCourse({
        courseId: course._id,
        update: {
          published: !course.published,
        },
      });
      await router.invalidate();
    },
    onError(error) {
      console.error("Error toggling published status:", error);
      toast.error("Unable to toggle published status");
    },
  });

  const { mutate: updateWeek, isPending: isUpdatingWeek } = useMutation({
    mutationFn: async (input: UpdateWeek) => {
      if (!activeWeek) return;
      await coursesApi.updateWeek(input);
      await navigate({
        to: ".",
        search: {
          week: input.update.weekNumber,
        },
      });
    },
    onError(error) {
      console.error("Error updating week:", error);
      toast.error("Unable to update week");
    },
  });

  const { mutate: createWeek, isPending: isCreatingWeek } = useMutation({
    mutationFn: async () => {
      const result = await coursesApi.addWeek({
        courseId: course._id,
        topic: "Untitled",
        weekNumber: weeks.length + 1,
        notes: "",
        video: "",
      });
      await navigate({
        to: ".",
        search: {
          week: result.weekNumber,
        },
      });
    },
    onError(error) {
      console.error("Error adding week:", error);
      responseErrorToast(error);
    },
  });

  const isLoading = isTogglingPublish || isUpdatingWeek || isCreatingWeek;

  const SidebarContent = () => (
    <ScrollArea className="h-full py-4">
      <div className="px-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Course Settings
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <Label htmlFor="publish-switch" className="text-sm font-medium">
              {course.published ? "Published" : "Draft"}
            </Label>
            <Switch
              id="publish-switch"
              checked={course.published}
              onCheckedChange={() => togglePublish()}
              disabled={isTogglingPublish}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <Collapsible open={weeksExpanded} onOpenChange={setWeeksExpanded}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Content
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => createWeek()}
                  disabled={isCreatingWeek}
                >
                  {isCreatingWeek ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        weeksExpanded ? "rotate-180" : "",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            <CollapsibleContent>
              <nav className="mt-4 flex flex-col gap-1">
                {weeks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No weeks added yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click + to add a week
                    </p>
                  </div>
                ) : (
                  weeks.map((aWeek, index) => (
                    <Link
                      key={aWeek._id}
                      to="."
                      search={{ week: index + 1 }}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        weekSearchParam === index + 1
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full text-xs font-medium",
                          weekSearchParam === index + 1
                            ? "bg-primary-foreground text-primary"
                            : "bg-accent",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{aWeek.topic}</span>
                    </Link>
                  ))
                )}
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <OverlayLoader isLoading={isLoading} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="flex h-14 items-center gap-4 px-4 md:px-6">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <ArrowLeft className="size-5" />
          </Button>

          {/* Logo */}
          <Link
            to="/dashboard/courses"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="hidden size-4 md:block" />
            <img src={logoImg} alt="Modools" className="h-6 w-auto" />
          </Link>

          {/* Course Title */}
          <div className="flex-1">
            <span className="text-muted-foreground">Course /</span>{" "}
            <span className="font-medium">{course.title}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Card>
            <CardHeader className="border-b">
              <Tabs defaultValue="materials" className="w-full">
                <TabsList>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="materials" className="w-full">
                <TabsContent value="materials">
                  {activeWeek ? (
                    <CourseEditor submit={updateWeek} week={activeWeek} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select a week to edit or create a new one.
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="assessment">
                  {activeWeek ? (
                    <Assessment courseId={course._id} weekId={activeWeek._id} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select a week to manage assessments.
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="submissions">
                  {activeWeek ? (
                    <SubmissionFlow weekId={activeWeek._id} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select a week to view submissions.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
