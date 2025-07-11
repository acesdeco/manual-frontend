import z from "zod";

export const iCourseSchema = z.object({
  _id: z.string(),
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
