import { assessmentsApi } from "@/api";
import { queryOptions } from "@tanstack/react-query";

export const assessmentsQuery = (weekId: number) =>
  queryOptions({
    queryKey: ["assessments", weekId],
    queryFn: async () => await assessmentsApi.getAssessmentByWeek(weekId),
  });
