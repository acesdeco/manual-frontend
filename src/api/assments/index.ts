import { api, parseApiResponse } from "../utils"
import {
  type NewAssment,
  type SubmitAssessmentInput,
  assessmentSchema,
  newAssessmentSchema,
  submitAssessmentSchema,
} from "./schema"
import { type Week, parseResponse, weekSchema } from "@/schemas"

export async function getAssessment(
  assessmentId: string,
  signal?: AbortSignal,
) {
  assessmentSchema.shape._id.parse(assessmentId)
  const res = await api
    .get(`assessment/${assessmentId}`, {
      signal,
    })
    .json()
  return parseResponse(res, assessmentSchema)
}

export async function createAssessment(input: NewAssment) {
  newAssessmentSchema.parse(input)
  await api.post("assessment", {
    json: input,
  })
}

export async function updateAssessment(input: NewAssment) {
  newAssessmentSchema.parse(input)
  await api.put(`assessment/${input._id}`, {
    json: input,
  })
}

export async function getAssessmentsByWeek(
  weekId: Week["_id"],
  signal?: AbortSignal,
) {
  weekSchema.shape._id.parse(weekId)
  const res = await api
    .get(`assessment/week/${weekId}`, {
      signal,
    })
    .json()
  return parseApiResponse(res, assessmentSchema.array())
}

export async function submitAssessment(input: SubmitAssessmentInput) {
  submitAssessmentSchema.parse(input)
  await api.post("assessment/submit", {
    json: input,
  })
}
