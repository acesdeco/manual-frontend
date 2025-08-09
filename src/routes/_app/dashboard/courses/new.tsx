import Modal from "@/components/global/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  iCreateCourseFn,
  iCreateCourseSchema,
  type ICreateCourse,
} from "@/functions/courses";
import { instructorOnlyFn } from "@/functions/global";
import { cn } from "@/lib/utils";
import type { RequireFields } from "@/types";
import { responseErrorMessage } from "@/utils/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { ComponentProps, FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CustomLabel: FC<
  RequireFields<ComponentProps<"label">, "children" | "htmlFor">
> = ({ className, ...props }) => (
  <label {...props} className={cn("text-black", className)} />
);

const CustomInput: FC<RequireFields<ComponentProps<"input">, "id">> = ({
  className,
  ...props
}) => (
  <input
    {...props}
    className={cn(
      "bg-white focus:outline-none outline-none border-b-2 border-b-[#D9D9D9] text-black",
      className,
    )}
  />
);

export const Route = createFileRoute("/_app/dashboard/courses/new")({
  beforeLoad: async () => await instructorOnlyFn(),
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Create Course" },
      { name: "description", content: "Creating course..." },
    ],
  }),
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
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
    },
  });
  const createCourseFn = useServerFn(iCreateCourseFn);
  const { mutate } = useMutation({
    mutationFn: createCourseFn,
    onMutate({ data }) {
      toast.loading(`Creating ${data.code}`, {
        id: data.code,
      });
    },
    onSuccess(_, { data }) {
      toast.success(`${data.code} created successfully`, {
        id: data.code,
      });
    },
    onError(error, { data }) {
      console.error("Error creating instructor's course:", error);
      toast.error(responseErrorMessage(error), {
        id: data.code,
      });
    },
  });
  return (
    <>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit((data) => mutate({ data }))}>
          <Modal
            isModalOpen={true}
            header="Create Course"
            isForm={true}
            acceptText="Create Course"
          >
            <div className="flex gap-5 flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel asChild>
                      <CustomLabel htmlFor={field.name}>
                        Course Name
                      </CustomLabel>
                    </FormLabel>
                    <FormControl>
                      <CustomInput {...field} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel asChild>
                      <CustomLabel htmlFor={field.name}>
                        Course Code
                      </CustomLabel>
                    </FormLabel>
                    <FormControl>
                      <CustomInput {...field} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coursePrice"
                render={({ field }) => (
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel asChild>
                      <CustomLabel htmlFor={field.name}>
                        Course Price
                      </CustomLabel>
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.currentTarget.valueAsNumber)
                        }
                        id={field.name}
                        type="number"
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
                  <FormItem className="flex gap-1 flex-col">
                    <FormLabel asChild>
                      <CustomLabel htmlFor={field.name}>
                        Course Description
                      </CustomLabel>
                    </FormLabel>
                    <FormControl>
                      <CustomInput {...field} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Modal>
        </form>
      </Form>
    </>
  );
}
