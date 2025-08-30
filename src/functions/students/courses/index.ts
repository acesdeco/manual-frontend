import { coursesApi } from "@/api";
import { studentsMiddleware } from "@/middleware";
import { createServerFn } from "@tanstack/react-start";

export const getStudentsEnrolledCoursesFn = createServerFn({
  method: "GET",
})
  .middleware([studentsMiddleware])
  .handler(async ({ context }) => {
    const courseIds = await coursesApi.getUsersEnrolledCourseIds(
      context.user.user,
    );
    return await Promise.all(courseIds.map((id) => coursesApi.getCourse(id)));
  });
