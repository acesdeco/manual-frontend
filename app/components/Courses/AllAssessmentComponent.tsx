import React, { useEffect, useState } from 'react';
import { getAssessmentByWeek, IAssessment } from '~/axios/Assessment';
import AssessmentComponent from './AssessmentComponent';

interface AllAssessmentComponentProps {
    weekId: string;
}

const AllAssessmentComponent: React.FC<AllAssessmentComponentProps> = ({ weekId }) => {
    const [assessments, setAssessments] = useState<IAssessment[]>([]);
    const [activeAssessment, setActiveAssessment] = useState<IAssessment | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await getAssessmentByWeek(weekId);
                console.log(response);
                if (response.success && response.data) {
                    setAssessments(response.data as IAssessment[]);
                } else {
                    setError(response.message || 'Failed to fetch assessments');
                }
            } catch (err) {
                setError('An error occurred while fetching assessments');
            }
        };

        fetchAssessments();
    }, [weekId]);

    const handleAssessmentClick = (assessment: IAssessment) => {
        setActiveAssessment(assessment);
    };

    return (
        <div>
            <h1>Assessments for Week {weekId}</h1>
            {error && <div className="error">{error}</div>}
            {assessments.length === 0&& <div className="error text-gray-900">No assessments for this week</div>}
            {assessments.length === 0 && !error && <div className="loading">Loading...</div>}

            <div className="assessment-list">
                {assessments.map((assessment) => (
                    <button className='bg-blue-600' key={assessment._id} onClick={() => handleAssessmentClick(assessment)}>
                        <h2>{assessment.title}</h2>
                        <p>{assessment.description}</p>
                    </button>
                ))}
            </div>
            {activeAssessment && (
                <div className="active-assessment">
                    <AssessmentComponent assessment={activeAssessment} />
                </div>
            )}
        </div>
    );
};

export default AllAssessmentComponent;