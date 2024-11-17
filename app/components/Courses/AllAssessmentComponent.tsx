import React, { useEffect, useState } from "react";
import { getAssessmentByWeek, IAssessment } from "~/axios/Assessment";
import AssessmentComponent from "./AssessmentComponent";

interface AllAssessmentComponentProps {
  weekId: string;
  user: { student_id: string; student_name: string; reg_number: string };
}

const AllAssessmentComponent: React.FC<AllAssessmentComponentProps> = ({
  weekId,
  user,
}) => {
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [activeAssessment, setActiveAssessment] = useState<IAssessment | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await getAssessmentByWeek(weekId);
        if (response.success && response.data) {
          setAssessments(response.data as IAssessment[]);
        } else {
          setError(response.message || "Failed to fetch assessments");
        }
      } catch (err) {
        setError("An error occurred while fetching assessments");
      }
    };

    fetchAssessments();
  }, [weekId]);

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
          {error && <div className="error">{error}</div>}
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
