import { api, parseApiResponse } from "@/api/utils";
import { instructorMiddleware } from "@/middleware";
import { courseSchema } from "@/schemas";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { iCreateCourseSchema } from "./schema";
import { redirect } from "@tanstack/react-router";
import { handleServerFnError } from "@/utils/server";

export * from "./schema";

export const iGetCoursesByUserFn = createServerFn({ method: "GET" })
  .middleware([instructorMiddleware])
  .handler(async ({ context }) => {
    const res = await api.get(`course/creator/${context.user.user}`).json();
    return parseApiResponse(res, courseSchema.array());
  });

export const iCreateCourseFn = createServerFn({ method: "POST" })
  .middleware([instructorMiddleware])
  .validator(zodValidator(iCreateCourseSchema))
  .handler(async ({ data }) => {
    try {
      await api
        .post("course", {
          json: data,
        })
        .json();
    } catch (error) {
      return handleServerFnError(error);
    }
    throw redirect({
      to: "/dashboard/courses/$slug/edit",
      params: {
        slug: data.title.toLowerCase().replaceAll(" ", "-"),
      },
      from: "/dashboard/courses/new",
    });
  });
