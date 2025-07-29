import { assessmentsApi, submissionsApi } from "@/api";
import type { Assessment } from "@/api/assments/schema";
import type { Week } from "@/schemas";
import { queryOptions } from "@tanstack/react-query";

export function assessmentByWeekOptions(weekId: Week["_id"]) {
  return queryOptions({
    queryKey: ["assessments-by-week", weekId] as const,
    queryFn: ({ queryKey: [, weekId], signal }) =>
      assessmentsApi.getAssessmentsByWeek(weekId, signal),
  });
}

export function submissionsByAssessmentOptions(
  assessmentId: Assessment["_id"],
) {
  return queryOptions({
    queryKey: ["submissions-by-assessment", assessmentId] as const,
    queryFn: ({ queryKey: [, assessmentId], signal }) =>
      submissionsApi.getSubmissionsByAssessment(assessmentId, signal),
  });
}
