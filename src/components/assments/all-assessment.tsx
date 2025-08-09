import type { Assessment } from "@/api/assments/schema";
import { assessmentByWeekOptions } from "@/queries";
import type { Week } from "@/schemas";
import type { Student } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import SubmitAssessment from "./submit-assessment";

interface AllAssessmentsProps {
  weekId: Week["_id"];
  user: Student;
}

const AllAssessments: FC<AllAssessmentsProps> = ({ weekId, user }) => {
  const { data: assessments, error } = useSuspenseQuery(
    assessmentByWeekOptions(weekId),
  );
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(
    null,
  );

  const handleAssessmentClick = (assessment: Assessment) => {
    setActiveAssessment(assessment);
  };

  return (
    <>
      {activeAssessment ? (
        <div className="active-assessment text-gray-800">
          <SubmitAssessment student={user} assessment={activeAssessment} />
        </div>
      ) : (
        <div>
          <h1 className="text-gray-800 text-xl py-3">
            Assessments for Week {weekId}
          </h1>
          {error && <div className="error">{error.message}</div>}
          {assessments.length === 0 && (
            <div className="error text-gray-900">
              No assessments for this week
            </div>
          )}
          {assessments.length === 0 && !error && (
            <div className="loading">Loading...</div>
          )}

          <div className="assessment-list">
            {assessments.map((assessment) => (
              <button
                className="bg-blue-600 w-3/4 text-start p-4 rounded-md"
                key={assessment._id}
                onClick={() => handleAssessmentClick(assessment)}
              >
                <h2 className="text-xl">{assessment.title}</h2>
                <p className="text-sm">{assessment.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllAssessments;
