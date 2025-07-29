import { assessmentsApi } from "@/api";
import { type Assessment } from "@/api/assments/schema";
import { useQuery } from "@tanstack/react-query";
import AssessmentForm from "./assessment-form";

interface ActiveAsProps {
  assessmentId: string;
}

export default function ActiveAs({ assessmentId }: ActiveAsProps) {
  const {
    data: assessment,
    error,
    isPending,
  } = useQuery({
    queryKey: ["assessment", assessmentId] as const,
    queryFn: async ({ queryKey, signal }) => {
      const id = queryKey[1];
      const result = await assessmentsApi.getAssessment(id, signal);
      return {
        ...result,
        startTime: result.startTime ?? new Date().toISOString().slice(0, 16),
        endTime:
          result.endTime ??
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 16),
      } satisfies Assessment;
    },
  });

  if (error) {
    // FIXME
    console.error("Failed to fetch assessment data:", error);
    throw error;
  }

  if (isPending) {
    // FIXME
    return "Loading";
  }

  return <AssessmentForm initialFormState={assessment} />;
}
