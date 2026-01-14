import placeholderImg from "@/assets/images/amico.png?url";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Course } from "@/schemas";
import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
  variant?: "student" | "instructor";
}

export function CourseCard({ course, variant = "student" }: CourseCardProps) {
  const linkTo =
    variant === "instructor"
      ? "/dashboard/courses/$slug/edit"
      : "/courses/$slug/introduction";

  const instructorInitials = course.instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.courseImage || placeholderImg}
          alt={course.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {course.coursePrice > 0 && (
          <Badge className="absolute right-2 top-2 bg-primary">
            ₦{course.coursePrice.toLocaleString()}
          </Badge>
        )}
        {course.coursePrice === 0 && (
          <Badge variant="secondary" className="absolute right-2 top-2">
            Free
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1 text-lg">
              {course.title}
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-wider">
              {course.code}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>2 hours</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">
              {instructorInitials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground line-clamp-1">
            {course.instructor.name}
          </span>
        </div>
        <Button asChild size="sm">
          <Link to={linkTo} params={{ slug: course.slug }}>
            {variant === "instructor" ? "Edit" : "View"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface CourseCardSkeletonProps {
  className?: string;
}

export function CourseCardSkeleton({ className }: CourseCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* Image Skeleton */}
      <div className="aspect-video animate-pulse bg-accent" />

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-accent" />
          <div className="h-3 w-1/4 animate-pulse rounded bg-accent" />
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="h-4 w-1/3 animate-pulse rounded bg-accent" />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center gap-2">
          <div className="size-8 animate-pulse rounded-full bg-accent" />
          <div className="h-4 w-20 animate-pulse rounded bg-accent" />
        </div>
        <div className="h-8 w-16 animate-pulse rounded bg-accent" />
      </CardFooter>
    </Card>
  );
}
