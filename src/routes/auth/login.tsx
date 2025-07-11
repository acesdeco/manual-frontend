import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { cookieOptions } from "@/actions";
import { authApi } from "@/api";
import type { LoginInput } from "@/api/auth";
import amico from "@/assets/images/amico.png?url";
import Input from "@/components/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const loginServerFn = createServerFn({ method: "POST" })
  .validator(zodValidator(authApi.loginSchema))
  .handler(async ({ data }) => {
    const result = await authApi.login(data);
    setCookie("user", JSON.stringify(result), {
      ...cookieOptions,
      expires: new Date(Date.now() + 1000 * cookieOptions.maxAge),
    });
    throw redirect({
      to: "/dashboard/courses",
      from: "/auth/login",
    });
  });

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Login" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(authApi.loginSchema),
    defaultValues: {
      password: "",
      regNumber: "",
    },
  });
  const login = useServerFn(loginServerFn);
  async function onSubmit(data: LoginInput) {
    await login({ data });
  }
  // TODO HANDLE THIS WITH TANSTACK QUERY'S MUTATION
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
          <section className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="regNumber"
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {form.formState.isSubmitting ? (
                    // TODO see if this can be replaced with lucide react
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </button>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    from={Route.fullPath}
                    to="/auth/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </Form>
          </section>
          <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
            <img className="w-3/5" alt="Studious students" src={amico} />
          </section>
        </section>
      </main>
    </>
  );
}
