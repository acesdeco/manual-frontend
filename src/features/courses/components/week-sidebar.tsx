import { Link, useLocation } from "@tanstack/react-router"
import type { Course } from "@/schemas"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface WeekSidebarProps {
  course: Course
  currentSlug: string
}

export function WeekSidebar({ course, currentSlug }: WeekSidebarProps) {
  const location = useLocation()
  const weeks = Object.keys(course.weeks ?? {})

  return (
    <ScrollArea className="h-full py-6">
      <div className="px-3">
        <h2 className="mb-2 px-4 text-lg font-semibold">{course.title}</h2>
        <p className="mb-4 px-4 text-xs uppercase tracking-wider text-muted-foreground">
          {course.code}
        </p>

        <nav className="flex flex-col gap-1">
          {/* Introduction Link */}
          <Link
            to="/courses/$slug/introduction"
            params={{ slug: currentSlug }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              location.pathname.includes("/introduction")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs">
              📖
            </span>
            Introduction
          </Link>

          {/* Week Links */}
          {weeks.map((week) => {
            const weekNumber = +week + 1
            const isActive = location.pathname.includes(`/${week}`)

            return (
              <Link
                key={week}
                to="/courses/$slug/$week"
                params={{ slug: currentSlug, week }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs",
                    isActive
                      ? "bg-primary-foreground text-primary"
                      : "bg-accent",
                  )}
                >
                  {String(weekNumber).padStart(2, "0")}
                </span>
                Week {weekNumber}
              </Link>
            )
          })}
        </nav>
      </div>
    </ScrollArea>
  )
}
