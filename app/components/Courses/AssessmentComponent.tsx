import React, { useState } from "react";
import { submitAssessment } from "~/axios/Assessment";

interface Option {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string | number;
  question_text: string;
  question_type: string;
  selected?: string | number;
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

const AssessmentComponent: React.FC<AssessmentComponentProps> = ({
  assessment,
}) => {
  const currentTime = new Date();
  const startTime = new Date(assessment.startTime);
  const endTime = new Date(assessment.endTime);
  const [assessmentQuestions, setAssessmentQuestions] = useState(
    assessment.questions.map((question) => ({ ...question, selected: "" }))
  );

  const updateQuestionState = (
    questionId: string | number,
    selected: string
  ) => {
    const updatedQuestions = assessmentQuestions.map((question) => {
      if (question.id === questionId) {
        return { ...question, selected };
      }
      return question;
    });
    setAssessmentQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    const unansweredQuestions = assessmentQuestions.filter(
      (question) => question.selected === undefined || question.selected === ""
    );

    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const response = await submitAssessment({
        ...assessment,
        questions: assessmentQuestions,
      });

      if (!response.success) {
        throw new Error("Failed to submit assessment");
      }

      alert("Assessment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error submitting your assessment. Please try again.");
    }
  };

  if (currentTime < startTime || currentTime > endTime) {
    return <div>Assessment is not accessible at this time.</div>;
  }

  return (
    <div>
      <h1>{assessment.title}</h1>
      <p>{assessment.description}</p>
      {assessmentQuestions.map((question) => (
        <div key={question.id}>
          <h3>{question.question_text}</h3>
          {question.question_type === "objective" ? (
            question.options.map((option, index) => (
              <div key={index}>
                <input
                  onChange={() =>
                    updateQuestionState(question.id, question.id as string)
                  }
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.option_text}
                />
                <label>{option.option_text}</label>
              </div>
            ))
          ) : (
            <textarea
              onChange={(e) => updateQuestionState(question.id, e.target.value)}
            ></textarea>
          )}
        </div>
      ))}
    <button onClick={handleSubmit}>Submit Assessment</button>
    </div>
  );
};

export default AssessmentComponent;
