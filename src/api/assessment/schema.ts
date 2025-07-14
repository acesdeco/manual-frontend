import z from "zod";

export const iAssessmentSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  week_id: z.string(),
  created_by: z.string(),
  questions: z.array(
    z.object({
      id: z.string().or(z.number()),
      question_text: z.string(),
      question_type: z.string(),
      options: z.array(
        z.object({
          option_text: z.string(),
          is_correct: z.boolean(),
          _id: z.string(),
        })
      ),
    })
  ),
  dueDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type IAssessment = z.infer<typeof iAssessmentSchema>;

export const iSubmissionSchema = z.object({
  assessment: z.string(),
  student: z.object({
    student_id: z.string(),
    student_name: z.string(),
    reg_number: z.string(),
  }),
  answers: z.array(
    z.object({
      question: {
        question_id: z.string(),
        question_text: z.string(),
      },
      answer_text: z.string(),
    })
  ),
  submitted_at: z.string(),
});
export type ISubmission = z.infer<typeof iSubmissionSchema>;

export const submissionStatusSchema = z.object({
  submissionId: z.string(),
  userId: z.string(),
});
export type SubmissionStatusInput = z.infer<typeof submissionStatusSchema>;
