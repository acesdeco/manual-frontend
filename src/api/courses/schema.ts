import z from "zod";

export type CourseId = string & {
  readonly __brand: "courseId";
};
export const courseIdSchema = z
  .custom<CourseId>((val) => z.string().safeParse(val).success, {
    error: "Invalid course id",
  })
  .transform((val) => val as string);

export const iCourseSchema = z.object({
  _id: courseIdSchema,
  title: z.string(),
  code: z.string(),
  description: z.string(),
  instructor: z.object({
    name: z.string(),
    id: z.string(),
  }),
  courseImage: z.url().optional(),
  coursePrice: z.number(),
  introduction: z.object({
    video: z.url(),
    notes: z.string(),
  }),
  weeks: z.record(
    z.number(),
    z.object({
      video: z.url(),
      assessment: z.string(),
      notes: z.string(),
      topic: z.string(),
    })
  ),
  published: z.boolean(),
});
export type ICourse = z.infer<typeof iCourseSchema>;

export const getAllCoursesResult = z.object({
  data: z.array(iCourseSchema).catch([]),
});

export const updateCourseSchema = z.object({
  id: courseIdSchema,
  course: iCourseSchema,
});
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
