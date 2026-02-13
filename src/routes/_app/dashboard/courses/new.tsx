import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  type ICreateCourse,
  iCreateCourseFn,
  iCreateCourseSchema,
} from "@/functions/courses"
import { instructorOnlyFn } from "@/functions/global"
import { responseErrorToast } from "@/utils/client"

export const Route = createFileRoute("/_app/dashboard/courses/new")({
  beforeLoad: async () => await instructorOnlyFn(),
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Create Course" },
      { name: "description", content: "Create a new course" },
    ],
  }),
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const form = useForm<ICreateCourse>({
    resolver: zodResolver(iCreateCourseSchema),
    defaultValues: {
      code: "",
      description: "",
      coursePrice: 0,
      instructor: {
        id: user.user,
        name: user.fullName,
      },
      title: "",
      published: false,
    },
  })

  const createCourseFn = useServerFn(iCreateCourseFn)
  const { mutate, isPending } = useMutation({
    mutationFn: createCourseFn,
    onMutate({ data }) {
      toast.loading(`Creating ${data.code || "course"}...`, {
        id: "create-course",
      })
    },
    onSuccess(_, { data }) {
      toast.success(`${data.code} created successfully`, {
        id: "create-course",
      })
    },
    onError(error) {
      console.error("Error creating instructor's course:", error)
      responseErrorToast(error, {
        id: "create-course",
      })
    },
  })

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/dashboard/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to courses
      </Link>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
          <CardDescription>
            Fill in the details below to create a new course. You can add
            content and weeks after creation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutate({ data }))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Introduction to Computer Science"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., CSC101" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coursePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price (₦)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.currentTarget.valueAsNumber || 0)
                        }
                        type="number"
                        min={0}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe what students will learn in this course..."
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link to="/dashboard/courses">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Create Course
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
