import { parseResponse, weekSchema, type Week } from "@/schemas";
import { api } from "../clients";
import {
  assessmentSchema,
  newAssessmentSchema,
  submitAssessmentSchema,
  type NewAssment,
  type SubmitAssessmentInput,
} from "./schema";

export async function getAssessment(
  assessmentId: string,
  signal?: AbortSignal,
) {
  assessmentSchema.shape._id.parse(assessmentId);
  const res = await api
    .get(`assessment/${assessmentId}`, {
      signal,
    })
    .json();
  return parseResponse(res, assessmentSchema);
}

export async function createAssessment(input: NewAssment) {
  newAssessmentSchema.parse(input);
  await api.post("assessment", {
    json: input,
  });
}

export async function getAssessmentsByWeek(
  weekId: Week["_id"],
  signal?: AbortSignal,
) {
  weekSchema.shape._id.parse(weekId);
  const res = await api
    .get(`assessment/wek/${weekId}`, {
      signal,
    })
    .json();
  return assessmentSchema.array().parse(res);
}

export async function submitAssessment(input: SubmitAssessmentInput) {
  submitAssessmentSchema.parse(input);
  await api.post("assessment/submit", {
    json: input,
  });
}
