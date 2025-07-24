import z from "zod";
import { api } from "../clients";
import {
  iAssessmentSchema,
  iSubmissionSchema,
  submissionStatusSchema,
  type ISubmission,
  type SubmissionStatusInput,
} from "./schema";

export * from "./schema";

export async function getAssessment(id: string) {
  z.string().parse(id);
  const resJson = await api.get(`assessment/${id}`).json();
  return iAssessmentSchema.parse(resJson);
}

export async function getAssessmentByWeek(weekId: number) {
  z.number().parse(weekId);
  const resJson = await api.get(`assessment/week/${weekId}`);
  return z.array(iAssessmentSchema).parse(resJson);
}

export async function submitAssessment(assessment: ISubmission) {
  iSubmissionSchema.parse(assessment);
  await api.post("assessment/submit", {
    json: assessment,
  });
}

export async function sendSubmissionStatus(input: SubmissionStatusInput) {
  submissionStatusSchema.parse(input);
  const resJson = await api.post(
    `assessment/submission/${input.submissionId}`,
    {
      json: {
        userId: input.userId,
      },
    }
  );
  return z.object({ data: z.boolean() }).parse(resJson);
}
