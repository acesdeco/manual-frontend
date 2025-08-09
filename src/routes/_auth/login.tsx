import amicoImg from "@/assets/images/amico.png";
import AuthButton from "@/components/auth/auth-button";
import PasswordField from "@/components/auth/password-field";
import Input from "@/components/global/input";
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
  sLoginFn,
  sLoginSchema,
  type InstructorLogin as TInstructorLogin,
  type StudentLogin as TStudentLogin,
} from "@/functions/auth";
import AuthLayout from "@/layout/auth";
import { responseErrorMessage } from "@/utils/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/login")({
  component: () => (
    <AuthLayout
      InstructorComponent={InstructorLogin}
      StudentComponent={StudentLogin}
      imgSrc={amicoImg}
      title="Log In"
      route="login"
    />
  ),
  head: () => ({
    meta: [
      { title: "Login" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
});

function InstructorLogin() {
  const form = useForm<TInstructorLogin>({
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
      toast.error(responseErrorMessage(error));
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((data) => mutate({ data }))}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
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
                <FormControl>
                  <PasswordField field={field} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthButton type="submit" isLoading={isPending}>
            Log In
          </AuthButton>
        </form>
      </Form>
    </>
  );
}

function StudentLogin() {
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
      toast.error(responseErrorMessage(error));
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((data) => mutate({ data }))}
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
          <AuthButton type="submit" isLoading={isPending}>
            Log In
          </AuthButton>
        </form>
      </Form>
    </>
  );
}
