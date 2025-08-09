import illustrationImg from "@/assets/images/Illustration.png";
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
  iSignupFn,
  iSignupSchema,
  sSignUpFn,
  sSignUpSchema,
  type InstructorSignUp as TInstructorSignUp,
  type StudentSignUp as TStudentSignUp,
} from "@/functions/auth";
import AuthLayout from "@/layout/auth";
import { responseErrorMessage } from "@/utils/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/signup")({
  component: () => (
    <AuthLayout
      InstructorComponent={InstructorSignUp}
      StudentComponent={StudentSignUp}
      imgSrc={illustrationImg}
      title="Create Account"
      route="signup"
    />
  ),
  head: () => ({
    meta: [
      { title: "Create account" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
});

function InstructorSignUp() {
  const form = useForm<TInstructorSignUp>({
    resolver: zodResolver(iSignupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "instructor",
      confirmPassword: "",
      password: "",
    },
  });
  const signupFn = useServerFn(iSignupFn);
  const { mutate, isPending } = useMutation({
    mutationFn: signupFn,
    onError(error) {
      console.error("Error during instructor signup:", error);
      toast.error(responseErrorMessage(error));
    },
  });
  return (
    <>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit((data) => mutate({ data }))}>
          <div className="justify-between flex flex-col md:flex-row gap-0 md:gap-6 lg:gap-10 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email address" />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordField field={field} placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthButton type="submit" isLoading={isPending}>
            Create Account
          </AuthButton>
        </form>
      </Form>
    </>
  );
}

function StudentSignUp() {
  const form = useForm<TStudentSignUp>({
    resolver: zodResolver(sSignUpSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      registrationNumber: "",
      role: "student",
    },
  });
  const signUpFn = useServerFn(sSignUpFn);
  const { mutate, isPending } = useMutation({
    mutationFn: signUpFn,
    onError(error) {
      console.error("Error during sign up:", error);
      toast.error(responseErrorMessage(error));
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((data) =>
            mutate({
              data,
            }),
          )}
        >
          <div className="justify-between flex flex-col md:flex-row gap-0 md:gap-6 lg:gap-10 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Registration Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email address" />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordField field={field} placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthButton type="submit" isLoading={isPending}>
            Create Account
          </AuthButton>
        </form>
      </Form>
    </>
  );
}
