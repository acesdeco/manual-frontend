import { courseSchema, weekSchema } from "@/schemas";
import z from "zod";

export const updateCourseSchema = z.object({
  courseId: z.string(),
  update: courseSchema.in.partial(),
});
export type UpdateCourse = z.infer<typeof updateCourseSchema>;

export const updateWeekSchema = z.object({
  weekId: weekSchema.shape._id,
  update: z.object({
    ...weekSchema.partial().omit({
      _id: true,
    }).shape,
    ...weekSchema.pick({
      weekNumber: true,
    }).shape,
  }),
});
export type UpdateWeek = z.infer<typeof updateWeekSchema>;

export const addWeekSchema = z.object({
  courseId: z.string(),
  video: z.string().optional(),
  notes: z.string().optional(),
  topic: z.string(),
  weekNumber: z.number(),
});
export type AddWeek = z.infer<typeof addWeekSchema>;
