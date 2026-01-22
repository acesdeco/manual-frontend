import { type Assessment, assessmentSchema } from "../assments/schema"
import { api } from "../utils"
import {
  type UpdateSubmissionInput,
  submissionSchema,
  updateSubmissionSchema,
} from "./schema"
import { parseResponse } from "@/schemas"

export async function getSubmissionsByAssessment(
  assessmentId: Assessment["_id"],
  signal?: AbortSignal,
) {
  assessmentSchema.shape._id.parse(assessmentId)
  const res = await api
    .get(`assessment/submissions/${assessmentId}`, {
      signal,
    })
    .json()
  return parseResponse(res, submissionSchema.array())
}

export async function updateSubmission(input: UpdateSubmissionInput) {
  updateSubmissionSchema.parse(input)
  await api.put(`submission/${input.id}`, {
    json: input.update,
  })
}
