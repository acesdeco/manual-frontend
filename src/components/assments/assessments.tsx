import type { Assessment as TAssessment } from "@/api/assments/schema";
import { assessmentByWeekOptions } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { Loader } from "../global/loader";
import AssessmentForm from "./assessment-form";

interface AssessmentsProps {
  weekId: string;
}

type Mode =
  | { state: "edit"; assessment: TAssessment }
  | { state: "new" }
  | { state: "view" };

export const Assessment: FC<AssessmentsProps> = ({ weekId }) => {
  const {
    data: assessments,
    isPending: loadingAssesments,
    error,
  } = useQuery(assessmentByWeekOptions(weekId));

  const [mode, setMode] = useState<Mode>({
    state: "view",
  });

  if (loadingAssesments) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) throw error;

  switch (mode.state) {
    case "edit": {
      return <AssessmentForm initialFormState={mode.assessment} />;
    }
    case "new": {
      return <AssessmentForm initialFormState={null} />;
    }
    case "view": {
      return (
        <section>
          {assessments.length > 0 ? (
            <ul>
              {assessments.map((assessment) => (
                <li key={assessment._id} className="py-2">
                  <button
                    onClick={() =>
                      setMode({
                        state: "edit",
                        assessment,
                      })
                    }
                    className="bg-blue-300 p-2 w-full text-left rounded-md"
                  >
                    <h3>{assessment.title}</h3>
                    <p className="text-sm text-gray-600">
                      {assessment.description}
                    </p>
                  </button>
                </li>
              ))}

              <button
                className="bg-blue-600 mt-2 p-2 w-fit text-white rounded-md"
                onClick={() =>
                  setMode({
                    state: "new",
                  })
                }
              >
                Create New Assessment
              </button>
            </ul>
          ) : (
            <>
              <p>You have no assessments for this week</p>
              <button
                className="bg-blue-600 p-2 w-full my-4 text-white rounded-md"
                onClick={() =>
                  setMode({
                    state: "new",
                  })
                }
              >
                Create Assessment
              </button>
            </>
          )}
        </section>
      );
    }
  }
};
