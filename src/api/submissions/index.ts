import { parseResponse } from "@/schemas";
import { assessmentSchema, type Assessment } from "../assments/schema";
import { api } from "../clients";
import {
  submissionSchema,
  updateSubmissionSchema,
  type UpdateSubmissionInput,
} from "./schema";

export async function getSubmissionsByAssessment(
  assessmentId: Assessment["_id"],
  signal?: AbortSignal,
) {
  assessmentSchema.shape._id.parse(assessmentId);
  const res = await api
    .get(`assessment/submissions/${assessmentId}`, {
      signal,
    })
    .json();
  return parseResponse(res, submissionSchema.array());
}

export async function updateSubmission(input: UpdateSubmissionInput) {
  updateSubmissionSchema.parse(input);
  await api.put(`submission/${input.id}`, {
    json: input.update,
  });
}
