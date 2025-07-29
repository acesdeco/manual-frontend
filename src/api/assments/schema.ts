// FIXME I believe the questions are theory, not subjective

import z from "zod";

const baseQuestion = {
  id: z.nanoid().length(10),
  question_text: z.string(),
  marks: z.number().positive(),
};

const objectiveQuestion = z
  .object({
    ...baseQuestion,
    question_type: z.literal("objective"),
    options: z
      .object({
        option_text: z.string(),
        is_correct: z.boolean(),
        _id: z.string(),
      })
      .array()
      .min(2, "At least two options are required"),
  })
  .superRefine((data, ctx) => {
    const correctCount = data.options.filter((o) => o.is_correct).length;

    if (correctCount === 0) {
      ctx.addIssue({
        code: "custom",
        message: "You must mark at least one option as correct.",
        path: ["options"],
      });
    } else if (correctCount > 1) {
      ctx.addIssue({
        code: "custom",
        message: "Only one option can be marked as correct.",
        path: ["options"],
      });
    }
  });
export type ObjectiveQuestion = z.infer<typeof objectiveQuestion>;

const subjectiveQuestion = z.object({
  ...baseQuestion,
  question_type: z.literal("subjective"),
});
export type SubjectiveQuestion = z.infer<typeof subjectiveQuestion>;

export const questionSchema = z.discriminatedUnion("question_type", [
  objectiveQuestion,
  subjectiveQuestion,
]);

export type Question = z.infer<typeof questionSchema>;
export const assessmentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  week_id: z.string(),
  created_by: z.string(),
  questions: questionSchema.array(),
  dueDate: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});
export type Assessment = z.infer<typeof assessmentSchema>;

export const newAssessmentSchema = z.object({
  ...assessmentSchema.partial().shape,
  ...assessmentSchema.pick({
    title: true,
    description: true,
    startTime: true,
    endTime: true,
    questions: true,
  }).shape,
});
export type NewAssment = z.infer<typeof newAssessmentSchema>;
