import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  checkExistingPaymentFn,
  coursePaymentDetailsFn,
} from "@/functions/payments";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard } from "lucide-react";

export const Route = createFileRoute("/_app/payment/$courseId/pay")({
  component: Pay,
  beforeLoad: async ({ params }) => {
    await checkExistingPaymentFn({ data: params });
  },
  loader: async ({ params }) =>
    await coursePaymentDetailsFn({
      data: params,
    }),
  head: () => ({
    meta: [
      { title: "Payment - Modools" },
      { name: "description", content: "Complete your course payment" },
    ],
  }),
});

function Pay() {
  const { course, cappedCharge, paymentData, totalAmount } =
    Route.useLoaderData();

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          to="/dashboard/courses"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to courses
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Course Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>
                  Review your purchase before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.courseImage && (
                  <img
                    src={course.courseImage}
                    alt={course.title}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                )}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Instructor: {course.instructor.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="size-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Price</span>
                    <span>₦{course.coursePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Service Charge
                    </span>
                    <span>₦{cappedCharge.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <a href={paymentData.authorization_url}>Proceed to Pay</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
