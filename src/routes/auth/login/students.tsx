import Input from "@/components/global/input";
import { Loader } from "@/components/svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  sLoginFn,
  sLoginSchema,
  type StudentLogin,
} from "@/functions/students/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login/students")({
  head: () => ({
    meta: [
      { title: "Login" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<StudentLogin>({
    resolver: zodResolver(sLoginSchema),
    defaultValues: {
      password: "",
      registrationNumber: "",
      role: "student",
    },
  });
  const loginFn = useServerFn(sLoginFn);
  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onError(error) {
      console.error("Error during login:", error);
      toast.error("There was a problem with your request.");
    },
  });
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit((data) => mutate({ data }))}>
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Registration number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isPending ? <Loader /> : "Log in"}
          </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              from={Route.fullPath}
              to="/auth/signup/students"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
}
