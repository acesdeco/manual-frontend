import { authApi, coursesApi, paymentsApi } from "@/api";
import { setUserCookie } from "@/helpers/server/cookies";
import { studentsMiddleware } from "@/middleware";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const paymentCallbackFn = createServerFn({ method: "GET" })
  .middleware([studentsMiddleware])
  .validator(
    zodValidator(
      z.object({
        reference: z.string(),
        courseId: z.string(),
      }),
    ),
  )
  .handler(async ({ data, context: { user } }) => {
    const [course, txState] = await Promise.all([
      coursesApi.getCourse(data.courseId),
      paymentsApi.verifyPayment(data.reference),
    ]);
    if (txState.status === "success") {
      const newUser = await authApi.updateUser({
        data: {
          courses: [...(user.courses ?? []), data.courseId],
        },
        userId: user.user,
      });
      setUserCookie(user.role, newUser);
    }
    return { course, txState };
  });

const courseIdSchema = z.object({
  courseId: z.string(),
});

export const checkExistingPaymentFn = createServerFn({ method: "GET" })
  .validator(zodValidator(courseIdSchema))
  .middleware([studentsMiddleware])
  .handler(({ data: { courseId }, context: { user } }) => {
    // check if already paid
    if (user.courses.includes(courseId)) {
      throw redirect({
        to: "/courses/$courseId",
        params: {
          courseId,
        },
      });
    }
  });

export const coursePaymentDetailsFn = createServerFn({ method: "GET" })
  .validator(courseIdSchema)
  .middleware([studentsMiddleware])
  .handler(async ({ data: { courseId }, context: { user } }) => {
    const course = await coursesApi.getCourse(courseId);
    const APP_URL =
      process.env.APP_URL ?? import.meta.baseURL ?? "http://localhost:5173";
    const transactionFee = course.coursePrice < 2500 ? 0 : 100;
    const charge = course.coursePrice * 0.015 + transactionFee;
    const cappedCharge = charge > 2000 ? 2000 : charge;
    const totalAmount = course.coursePrice + cappedCharge;
    const paymentData = await paymentsApi.initializePayment({
      courseId,
      amount: totalAmount,
      callback_url: `${APP_URL}/payment/${courseId}/success`,
      email: user.email,
      paymentDate: Date.now().toString(),
      status: "pending",
      userId: user.user,
    });
    return { course, cappedCharge, totalAmount, paymentData };
  });
