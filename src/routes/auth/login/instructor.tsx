import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/instructor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {/* <Form
        key={'login_form'}
        id="login-form"
        method="post"
        onSubmit={() => setIsSubmitting(true)}
      >
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          {actionData?.validationErrors?.regNumber ? (
            <span className="text-sm text-red-700">
              {actionData?.validationErrors.email}
            </span>
          ) : null}
        </div>
        <div className="mb-6">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          formMethod="post"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          // onClick={() => setIsSubmitting(true)}
        >
          {isSubmitting ? (
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
            'Login'
          )}
        </button>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="/auth/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </Form> */}
    </>
  )
}
