import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useServerFn } from "@tanstack/react-start"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import amicoImg from "@/assets/images/amico.png"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AuthButton,
  AuthLayout,
  PasswordField,
} from "@/features/auth/components"
import {
  type InstructorLogin as TInstructorLogin,
  type StudentLogin as TStudentLogin,
  iLoginFn,
  iLoginSchema,
  sLoginFn,
  sLoginSchema,
} from "@/functions/auth"
import { responseErrorMessage } from "@/utils/client"

export const Route = createFileRoute("/_auth/login")({
  component: () => (
    <AuthLayout
      InstructorComponent={InstructorLogin}
      StudentComponent={StudentLogin}
      imgSrc={amicoImg}
      title="Welcome Back"
      description="Sign in to continue learning"
      route="login"
    />
  ),
  head: () => ({
    meta: [
      { title: "Login - Modools" },
      {
        name: "description",
        content: "Sign in to your Modools account",
      },
    ],
  }),
})

function InstructorLogin() {
  const form = useForm<TInstructorLogin>({
    resolver: zodResolver(iLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "instructor",
    },
  })
  const loginFn = useServerFn(iLoginFn)
  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onError(error) {
      console.error("Error during instructor login:", error)
      toast.error(responseErrorMessage(error) ?? "Login failed")
    },
  })

  return (
    <Form {...form}>
      {}
      <form
        onSubmit={form.handleSubmit((data) => mutate({ data }))}
        className="space-y-4"
      >
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
        <AuthButton type="submit" isLoading={isPending}>
          Sign In
        </AuthButton>
      </form>
    </Form>
  )
}

function StudentLogin() {
  const form = useForm<TStudentLogin>({
    resolver: zodResolver(sLoginSchema),
    defaultValues: {
      password: "",
      registrationNumber: "",
      role: "student",
    },
  })
  const loginFn = useServerFn(sLoginFn)
  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onError(error) {
      console.error("Error during login:", error)
      toast.error(responseErrorMessage(error) ?? "Login failed")
    },
  })

  return (
    <Form {...form}>
      <form
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
        <AuthButton type="submit" isLoading={isPending}>
          Sign In
        </AuthButton>
      </form>
    </Form>
  )
}
