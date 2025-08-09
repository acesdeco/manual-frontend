import PasswordField from "@/components/auth/password-field";
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
  type StudentLogin as TStudentLogin,
} from "@/functions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function StudentLogin() {
  const form = useForm<TStudentLogin>({
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
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((data) => mutate({ data }))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormControl>
                  <PasswordField field={field} placeholder="Password" />
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
            {isPending ? <Loader /> : "Log In"}
          </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              from="/login"
              to="/signup/students"
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
