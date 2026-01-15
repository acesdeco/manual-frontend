import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paymentCallbackFn } from "@/functions/payments";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { CheckCircle, XCircle } from "lucide-react";
import z from "zod";

export const Route = createFileRoute("/_app/payment/$courseId/callback")({
  component: Callback,
  validateSearch: zodValidator(
    z
      .object({
        trxref: z.string(),
      })
      .or(
        z.object({
          reference: z.string(),
        }),
      ),
  ),
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => {
    return paymentCallbackFn({
      data: {
        courseId: params.courseId,
        reference: "reference" in deps ? deps.reference : deps.trxref,
      },
    });
  },
  head: () => ({
    meta: [
      { title: "Payment Status - Modools" },
      { name: "description", content: "Payment confirmation" },
    ],
  }),
});

function Callback() {
  const { course, txState } = Route.useLoaderData();

  const isSuccess = txState.status === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div
            className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full ${
              isSuccess
                ? "bg-green-100 dark:bg-green-900/20"
                : "bg-destructive/10"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="size-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
          <CardDescription className="text-base">
            {isSuccess
              ? `Your payment for ${course.title} has been processed successfully.`
              : `Your payment for ${course.title} could not be processed. Please try again.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 text-left">
            <h4 className="mb-2 text-sm font-medium">Course Details</h4>
            <p className="text-sm text-muted-foreground">{course.title}</p>
            <p className="text-xs text-muted-foreground">
              {course.instructor.name}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {isSuccess ? (
            <Button asChild className="w-full">
              <Link
                to="/courses/$slug/introduction"
                params={{ slug: course.slug }}
              >
                Go to Course
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link
                  to="/payment/$courseId/pay"
                  params={{ courseId: course._id }}
                >
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard/courses">Back to Courses</Link>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
