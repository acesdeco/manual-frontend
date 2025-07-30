import { coursesApi } from "@/api";
import { studentsMiddleware } from "@/middleware";
import { createServerFn } from "@tanstack/react-start";

export const getStudentsEnrolledCoursesFn = createServerFn({
  method: "GET",
})
  .middleware([studentsMiddleware])
  .handler(({ context }) => coursesApi.getCoursesByUserId(context.user._id));
