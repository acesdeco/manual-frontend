import { authApi, coursesApi, paymentsApi } from "@/api";
import { setUserCookie } from "@/helpers/server/cookies";
import { studentsMiddleware } from "@/middleware";
import { courseSchema } from "@/schemas";
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
        courseId: courseSchema.in.shape._id,
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

const courseSlugSchema = z.object({
  courseId: z.string(),
});

export const checkExistingPaymentFn = createServerFn({ method: "GET" })
  .validator(zodValidator(courseSlugSchema))
  .middleware([studentsMiddleware])
  .handler(async ({ data, context: { user } }) => {
    const enrolledCourses = await coursesApi.getUsersEnrolledCourseIds(
      user.user,
    );
    // check if already paid
    const target = enrolledCourses.find((course) => course === data.courseId);
    if (target) {
      const targetCourse = await coursesApi.getCourse(target);
      throw redirect({
        to: "/courses/$slug/introduction",
        params: {
          slug: targetCourse.slug,
        },
      });
    }
  });

export const coursePaymentDetailsFn = createServerFn({ method: "GET" })
  .validator(courseSlugSchema)
  .middleware([studentsMiddleware])
  .handler(async ({ data, context: { user } }) => {
    const course = await coursesApi.getCourse(data.courseId);
    const APP_URL =
      process.env.APP_URL ?? import.meta.baseURL ?? "http://localhost:5173";
    const transactionFee = course.coursePrice < 2500 ? 0 : 100;
    const charge = course.coursePrice * 0.015 + transactionFee;
    const cappedCharge = charge > 2000 ? 2000 : charge;
    const totalAmount = course.coursePrice + cappedCharge;
    const paymentData = await paymentsApi.initializePayment({
      courseId: data.courseId,
      amount: totalAmount,
      callback_url: new URL(`/payment/${data.courseId}/callback`, APP_URL).href,
      email: user.email,
      paymentDate: Date.now().toString(),
      status: "pending",
      userId: user.user,
    });
    return { course, cappedCharge, totalAmount, paymentData };
  });
