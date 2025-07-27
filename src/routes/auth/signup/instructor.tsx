import Input from '@/components/global/input'
import { Loader } from '@/components/svg'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  iSignupFn,
  iSignupSchema,
  type InstructorSignUp,
} from '@/functions/instructor/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth/signup/instructor')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Create account' },
      {
        name: 'description',
        content: 'Welcome to Computer Engineering UNIUYO',
      },
    ],
  }),
})

function RouteComponent() {
  const form = useForm<InstructorSignUp>({
    resolver: zodResolver(iSignupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: 'instructor',
    },
  })
  const signupFn = useServerFn(iSignupFn)
  const { mutate, isPending } = useMutation({
    mutationFn: signupFn,
    onError(error) {
      // eslint-disable-next-line no-console
      console.error('Error during instructor signup:', error)
      toast.error('An unknown error occured')
    },
  })
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit((data) => mutate({ data }))}>
          <div className="justify-between flex gap-4 md:gap-6 lg:gap-10 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="w-full">
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
                <FormItem>
                  <FormControl className="w-full">
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
                <FormControl className="mb-4">
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
                <FormControl className="mb-4">
                  <Input {...field} type="password" placeholder="Password" />
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
                <FormControl className="mb-4">
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
            {isPending ? <Loader /> : 'Create Account'}
          </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/auth/login/instructor"
              from={Route.fullPath}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </form>
      </Form>
    </>
  )
}
