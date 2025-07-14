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

const client = api.extend((options) => ({
  prefixUrl: options.prefixUrl + "/assessment",
}));

export async function getAssessment(id: string) {
  z.string().parse(id);
  const resJson = await client.get(id).json();
  return iAssessmentSchema.parse(resJson);
}

export async function getAssessmentByWeek(weekId: number) {
  z.number().parse(weekId);
  const resJson = await client.get(`week/${weekId}`);
  return z.array(iAssessmentSchema).parse(resJson);
}

export async function submitAssessment(assessment: ISubmission) {
  iSubmissionSchema.parse(assessment);
  await client.post("submit", {
    json: assessment,
  });
}

export async function sendSubmissionStatus(input: SubmissionStatusInput) {
  submissionStatusSchema.parse(input);
  const resJson = await client.post(`submission/${input.submissionId}`, {
    json: {
      userId: input.userId,
    },
  });
  return z.object({ data: z.boolean }).parse(resJson);
}
