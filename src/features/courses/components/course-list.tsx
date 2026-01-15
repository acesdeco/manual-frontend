import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Course, UserRole } from "@/schemas";
import { Link } from "@tanstack/react-router";
import { BookOpen, Plus } from "lucide-react";
import { CourseCard, CourseCardSkeleton } from "./course-card";

interface CourseListProps {
  courses: Course[];
  role: UserRole;
  isLoading?: boolean;
}

export function CourseList({ courses, role, isLoading }: CourseListProps) {
  if (isLoading) {
    return <CourseListSkeleton />;
  }

  if (courses.length === 0) {
    return <CourseListEmpty role={role} />;
  }

  const variant = role === "instructor" ? "instructor" : "student";

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} variant={variant} />
      ))}
    </div>
  );
}

function CourseListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface CourseListEmptyProps {
  role: UserRole;
}

function CourseListEmpty({ role }: CourseListEmptyProps) {
  const isInstructor = role === "instructor";

  return (
    <Empty className="min-h-[400px] border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookOpen />
        </EmptyMedia>
        <EmptyTitle>
          {isInstructor ? "Your classroom awaits" : "No courses available"}
        </EmptyTitle>
        <EmptyDescription>
          {isInstructor
            ? "Create your first course and start inspiring minds."
            : "Check back later for new courses."}
        </EmptyDescription>
      </EmptyHeader>
      {isInstructor && (
        <EmptyContent>
          <Button asChild>
            <Link to="/dashboard/courses/new">
              <Plus className="mr-2 size-4" />
              Create Course
            </Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export { CourseListEmpty, CourseListSkeleton };
