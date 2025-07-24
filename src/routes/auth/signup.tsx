import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { authApi } from "@/api";
import type { SignUpInput } from "@/api/auth";
import illustration from "@/assets/images/Illustration.png?url";
import Input from "@/components/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const signUpServerFn = createServerFn({ method: "POST" })
  .validator(zodValidator(authApi.signUpSchema))
  .handler(async ({ data }) => {
    // TODO authenticate user immediately rather than redirect
    await authApi.signUp(data);
    throw redirect({
      from: "/auth/signup",
      to: "/auth/login",
    });
  });

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create account" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(authApi.signUpSchema),
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
  const signUp = useServerFn(signUpServerFn);
  async function onSubmit(data: SignUpInput) {
    await signUp({ data });
  }
  // TODO FIX WITH MUTATIONS
  // const [modalOpen, setModalOpen] = useState(false);
  // useEffect(() => {
  //   if (actionData?.responseError) {
  //     setModalOpen(true);
  //   }
  //   if (actionData?.validationErrors) {
  //   }
  // }, [actionData]);
  return (
    <>
      {/* {actionData?.responseError && modalOpen && (
        <div className="fixed h-screen z-50 w-screen inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white w-1/2 absolute p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-600">Error</h2>
            <p className="text-sm text-gray-600">
              {actionData.responseError.details?.message ||
                actionData.responseError.message}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
      <main className="w-full h-screen flex flex-col md:px-16 px-4 py-8 fade-in-bottom">
        <header>
          <h1 className="text-4xl font-bold mb-4">CPE Lab</h1>
          <p className="text-lg text-gray-600">
            Welcome to Computer Engineering UNIUYO
          </p>
        </header>
        <section className="h-full flex flex-row items-center justify-center">
          <section className="md:w-1/2 w-full h-full pt-10">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="justify-between flex gap-4 md:gap-6 lg:gap-10 w-full">
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
                    <FormItem className="mb-4">
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
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email address"
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
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {form.formState.isSubmitting ? (
                    // TODO CHECK LUCID REACT
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    from={Route.fullPath}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Log In
                  </Link>
                </p>
              </form>
            </Form>
          </section>
          <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
            <img className="w-3/5" alt="Studious students" src={illustration} />
          </section>
        </section>
      </main>
    </>
  );
}
