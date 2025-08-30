import { courseSchema } from "@/schemas";
import type z from "zod";

export const iCreateCourseSchema = courseSchema.in.omit({
  _id: true,
});
// .pick({
//   code: true,
//   description: true,
//   title: true,
//   coursePrice: true,
//   instructor: true,
// })

export type ICreateCourse = z.infer<typeof iCreateCourseSchema>;
