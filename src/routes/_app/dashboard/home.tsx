import badgeOfHonourImg from "@/assets/images/badge-of-honour.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/shared/components/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Trophy } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard/home")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Dashboard Home" },
      { name: "description", content: "Your learning dashboard" },
    ],
  }),
});

function RouteComponent() {
  const { role } = Route.useRouteContext();
  const isInstructor = role === "instructor";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back${isInstructor ? ", Instructor" : ""}!`}
        description="Here's an overview of your learning journey"
      />

      {/* Welcome Banner */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row md:justify-between">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h2 className="text-xl font-semibold">
              {isInstructor
                ? "Your efforts truly matter"
                : "Keep up the great work!"}
            </h2>
            <p className="text-muted-foreground">
              {isInstructor
                ? "With every step, you uplift lives and bring more light to the world. Thank you for being amazing."
                : "Continue learning and unlock new achievements. Every lesson brings you closer to your goals."}
            </p>
            <Button asChild>
              <Link
                to={
                  isInstructor ? "/dashboard/courses/new" : "/dashboard/courses"
                }
              >
                {isInstructor ? "Create Course" : "Browse Courses"}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <img
              src={badgeOfHonourImg}
              alt="Achievement badge"
              className="h-32 w-auto object-contain"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isInstructor ? "Total Courses" : "Enrolled Courses"}
            </CardTitle>
            <BookOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">
              {isInstructor
                ? "Courses you've created"
                : "Courses you're taking"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isInstructor ? "Total Students" : "Completed"}
            </CardTitle>
            <GraduationCap className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">
              {isInstructor ? "Students enrolled" : "Courses completed"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isInstructor ? "Assessments" : "Achievements"}
            </CardTitle>
            <Trophy className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">
              {isInstructor ? "Total assessments" : "Badges earned"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <Link to="/dashboard/courses">
              <BookOpen className="mr-3 size-5" />
              <div className="text-left">
                <div className="font-medium">
                  {isInstructor ? "Manage Courses" : "Browse Courses"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isInstructor
                    ? "Edit and update your courses"
                    : "Find new courses to enroll in"}
                </div>
              </div>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <Link
              to={
                isInstructor ? "/dashboard/courses/new" : "/dashboard/enrolled"
              }
            >
              <GraduationCap className="mr-3 size-5" />
              <div className="text-left">
                <div className="font-medium">
                  {isInstructor ? "Create Course" : "My Courses"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isInstructor
                    ? "Start building a new course"
                    : "Continue your learning"}
                </div>
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
