import React, { useState, useEffect, type FC } from "react";
import { sendSubmissionStatus, submitAssessment } from "@/axios/Assessment";

interface Option {
  option_text: string;
  is_correct: boolean;
  _id: string;
}

interface Question {
  _id?: string;
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
  student: {
    student_id: string;
    student_name: string;
    reg_number: string;
  };
}

const AssessmentComponent: FC<AssessmentComponentProps> = ({
  assessment,
  student,
}) => {
  const currentTime = new Date();
  const startTime = new Date(assessment.startTime);
  const endTime = new Date(assessment.endTime);
  const [assessmentQuestions, setAssessmentQuestions] = useState(
    assessment.questions.map((question) => ({ ...question, selected: "" }))
  );
  const [canTakeAssessment, setCanTakeAssessment] = useState(false);
  const [takeAssessment, setTakeAssessment] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    const sendAssessmentStatus = async () => {
      try {
        const response = await sendSubmissionStatus(
          assessment._id,
          student.student_id
        );
        const responseData = response.data as { data: boolean };
        if (responseData.data) {
          setCanTakeAssessment(false);
        }
        if (responseData.data === false) {
          setCanTakeAssessment(true);
        }
        if (!response.success) {
          throw new Error("Failed to send assessment status");
        }
      } catch (error) {
        console.error("Error sending assessment status:", error);
      }
    };

    sendAssessmentStatus();
  }, [
    assessment._id,
    student.student_id,
    student.student_name,
    student.reg_number,
  ]);

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
        assessment: assessment._id,
        student: {
          student_id: student.student_id,
          student_name: student.student_name,
          reg_number: student.reg_number,
        },
        answers: assessmentQuestions.map((question) => ({
          question: {
            question_id: question._id as string,
            question_text: question.question_text,
            question_type: question.question_type,
          },
          answer_text: question.selected as string,
        })),
        submitted_at: new Date().toISOString(),
      });

      if (!response.success) {
        throw new Error("Failed to submit assessment");
      }
      setTaken(true);
      setCanTakeAssessment(false);
      alert("Assessment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error submitting your assessment. Please try again.");
    }
  };

  if (currentTime < startTime || currentTime > endTime) {
    return <div>Assessment is not accessible at this time.</div>;
  }
  if (!canTakeAssessment || taken) {
    return (
      <div>
        <h2>You have already taken this assessment</h2>
        <p>Check back later for your score</p>
      </div>
    );
  }

  if (!takeAssessment && canTakeAssessment) {
    return (
      <div className="py-5">
        <h1 className="text-xl">{assessment.title}</h1>
        <p className="text-lg">{assessment.description}</p>
        <button
          className="bg-blue-600 p-3 rounded-lg text-white my-5"
          onClick={() => setTakeAssessment(true)}
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl">{assessment.title}</h1>
      <p className="text-lg">{assessment.description}</p>
      {assessmentQuestions.map((question, index) => (
        <div className="py-4" key={question.id}>
          <h3 className="py-2">
            <span className="mr-3">{index + 1}.</span>
            {question.question_text}
          </h3>
          {question.question_type === "objective" ? (
            question.options.map((option, index) => (
              <div key={index}>
                <input
                  onChange={() => updateQuestionState(question.id, option._id)}
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.option_text}
                  className="mr-1"
                />
                <label>{option.option_text}</label>
              </div>
            ))
          ) : (
            <textarea
              onChange={(e) => updateQuestionState(question.id, e.target.value)}
              className="bg-white border border-black w-2/4"
              rows={4}
            ></textarea>
          )}
        </div>
      ))}
      <button
        className="bg-blue-600 p-3 rounded-lg text-white"
        onClick={handleSubmit}
      >
        Submit Assessment
      </button>
    </div>
  );
};

export default AssessmentComponent;
