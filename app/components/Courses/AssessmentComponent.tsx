import React from 'react';

interface Option {
    option_text: string;
    is_correct: boolean;
}

interface Question {
    id: string | number;
    question_text: string;
    question_type: string;
    options: Option[];
}

interface Assessment {
    _id: string;
    title: string;
    description: string;
    courseId: string;
    week_id: string;
    created_by: string;
    questions: Question[];
    dueDate: string;
    startTime: string;
    endTime: string;
}

interface AssessmentComponentProps {
    assessment: Assessment;
}

const AssessmentComponent: React.FC<AssessmentComponentProps> = ({ assessment }) => {
    const currentTime = new Date();
    const startTime = new Date(assessment.startTime);
    const endTime = new Date(assessment.endTime);

    if (currentTime < startTime || currentTime > endTime) {
        return <div>Assessment is not accessible at this time.</div>;
    }

    return (
        <div>
            <h1>{assessment.title}</h1>
            <p>{assessment.description}</p>
            {assessment.questions.map((question) => (
                <div key={question.id}>
                    <h3>{question.question_text}</h3>
                    {question.options.map((option, index) => (
                        <div key={index}>
                            <input type="radio" name={`question-${question.id}`} value={option.option_text} />
                            <label>{option.option_text}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AssessmentComponent;