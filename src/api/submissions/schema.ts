import { registrationNumberSchema } from "@/schemas";
import z from "zod";

export const submissionSchema = z.object({
  _id: z.string(),
  assessment: z.string(),
  student: z.object({
    student_id: z.string(),
    student_name: z.string(),
    reg_number: registrationNumberSchema,
  }),
  total_score: z.number(),
  answers: z
    .object({
      question: z.object({
        question_id: z.string(),
        question_text: z.string(),
        question_type: z.string(),
      }),
      marks_obtained: z.number(),
      answer_text: z.string(),
    })
    .array(),
  submitted_at: z.string(),
});
export type Submission = z.infer<typeof submissionSchema>;

export const updateSubmissionSchema = z.object({
  id: submissionSchema.shape._id,
  update: submissionSchema
    .omit({
      _id: true,
    })
    .partial(),
});
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;
