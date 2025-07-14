import type { IAssessment } from "@/api/assessment";
import { assessmentsQuery } from "@/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import AssessmentComponent from "./AssessmentComponent";

interface AllAssessmentComponentProps {
  weekId: number;
  user: { student_id: string; student_name: string; reg_number: string };
}

const AllAssessmentComponent: FC<AllAssessmentComponentProps> = ({
  weekId,
  user,
}) => {
  const { data: assessments, error } = useSuspenseQuery(
    assessmentsQuery(weekId)
  );
  const [activeAssessment, setActiveAssessment] = useState<IAssessment | null>(
    null
  );

  const handleAssessmentClick = (assessment: IAssessment) => {
    setActiveAssessment(assessment);
  };

  return (
    <>
      {activeAssessment ? (
        <div className="active-assessment text-gray-800">
          <AssessmentComponent student={user} assessment={activeAssessment} />
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

export default AllAssessmentComponent;
