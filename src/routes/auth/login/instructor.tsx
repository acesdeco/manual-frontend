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
  iLoginFn,
  iLoginSchema,
  type InstructorLogin,
} from "@/functions/instructor/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login/instructor")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<InstructorLogin>({
    resolver: zodResolver(iLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "instructor",
    },
  });
  const loginFn = useServerFn(iLoginFn);
  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onError(error) {
      console.error("Error during instructor login:", error);
      toast.error("An error occured.");
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl className="mb-4">
                  <Input {...field} type="email" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl className="mb-6">
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isPending ? <Loader /> : "Login"}
          </button>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/signup/instructor"
              from={Route.fullPath}
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
