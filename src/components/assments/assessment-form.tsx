import { assessmentsApi } from "@/api";
import {
  newAssessmentSchema,
  type NewAssment,
  type Question,
} from "@/api/assments/schema";
import { cn } from "@/lib/utils";
import type { Course, Week } from "@/schemas";
import type { RequireFields } from "@/types";
import { responseErrorToast } from "@/utils/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { type ComponentProps, type FC } from "react";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Questions from "./questions";

const CustomLabel: FC<
  RequireFields<ComponentProps<"label">, "children" | "htmlFor">
> = ({ className, ...props }) => (
  <label
    {...props}
    className={cn("block text-sm font-medium text-gray-700", className)}
  />
);

const CustomInput: FC<RequireFields<ComponentProps<"input">, "id">> = ({
  className,
  ...props
}) => (
  <input
    {...props}
    className={cn(
      "mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      className,
    )}
  />
);

type AssessmentFormProps = {
  initialFormState: NewAssment | null;
  weekId: Week["_id"];
  courseId: Course["_id"];
  goBack?: () => void;
};

const editRoute = getRouteApi("/_app/dashboard/courses/$slug/edit");

const AssessmentForm: FC<AssessmentFormProps> = ({
  initialFormState,
  weekId,
  courseId,
  goBack,
}) => {
  const queryClient = useQueryClient();
  const { user } = editRoute.useRouteContext();

  const form = useForm<NewAssment>({
    resolver: zodResolver(newAssessmentSchema),
    defaultValues: initialFormState ?? {
      description: "",
      endTime: "",
      questions: [],
      startTime: "",
      title: "",
      week_id: weekId,
      courseId,
      created_by: user.user,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: initialFormState
      ? assessmentsApi.updateAssessment
      : assessmentsApi.createAssessment,
    onMutate({ title, _id }) {
      toast.loading(`${_id ? "Creating" : "Updating"} assessment"`, {
        id: title,
      });
    },
    async onSuccess(_, { title, _id }) {
      toast.success(`Assessment ${_id ? "updated" : "created"} successfully!`, {
        id: title,
      });
      await queryClient.invalidateQueries();
      goBack?.();
    },
    onError(error, { title, _id }) {
      console.error(
        `Error ${_id ? "updating" : "creating"} assessment:"`,
        error,
      );
      responseErrorToast(error, {
        id: title,
      });
    },
  });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-2">Create Assessment</h1>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel asChild>
                  <CustomLabel htmlFor={field.name}>Title</CustomLabel>
                </FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    id={field.name}
                    placeholder="Enter assessment title"
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
                <FormLabel asChild>
                  <CustomLabel htmlFor={field.name}>Description</CustomLabel>
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    id={field.name}
                    placeholder="Enter assessment description"
                    className="mt-1 block w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel asChild>
                  <CustomLabel htmlFor={field.name}>Start Time</CustomLabel>
                </FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    id={field.name}
                    type="datetime-local"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel asChild>
                  <CustomLabel htmlFor={field.name}>End Time</CustomLabel>
                </FormLabel>
                <FormControl>
                  <CustomInput
                    {...field}
                    id={field.name}
                    type="datetime-local"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => {
              const addQuestion = () => {
                field.onChange([
                  ...field.value,
                  {
                    id: nanoid(10),
                    options: [],
                    question_text: "",
                    question_type: "objective",
                    marks: 1,
                  },
                ] satisfies NewAssment["questions"]);
              };
              const removeQuestion = (id: Question["id"]) => {
                field.onChange(
                  field.value.filter((question) => question.id !== id),
                );
              };
              return (
                <FormItem>
                  <FormLabel asChild>
                    <CustomLabel htmlFor={field.name}>Questions</CustomLabel>
                  </FormLabel>
                  <FormControl className="mt-1 flex flex-col gap-4">
                    {field.value.map((question, index) => (
                      <div key={question.id} className="relative group">
                        <Questions
                          questionId={question.id}
                          questionIndex={index}
                          removeQuestion={removeQuestion}
                        />
                        <button
                          type="button"
                          onClick={addQuestion}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
                        >
                          <BiPlus size={24} />
                        </button>
                      </div>
                    ))}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <button
            className="py-1 px-4 w-fit bg-blue-600 text-white rounded-md"
            type="submit"
            disabled={isPending}
          >
            Submit
          </button>
        </form>
      </Form>
    </section>
  );
};

export default AssessmentForm;
