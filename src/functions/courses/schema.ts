import type z from "zod"
import { courseSchema } from "@/schemas"

export const iCreateCourseSchema = courseSchema.in.omit({
  _id: true,
})
// .pick({
//   code: true,
//   description: true,
//   title: true,
//   coursePrice: true,
//   instructor: true,
// })

export type ICreateCourse = z.infer<typeof iCreateCourseSchema>
