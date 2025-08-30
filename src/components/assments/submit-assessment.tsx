import { assessmentsApi } from "@/api";
import type { Assessment } from "@/api/assments/schema";
import { useMutation } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { toast } from "sonner";

interface SubmitAssessmentProps {
  assessment: Assessment;
  student: {
    student_id: string;
    student_name: string;
    reg_number: string;
  };
}

const SubmitAssessment: FC<SubmitAssessmentProps> = ({
  assessment,
  student,
}) => {
  const currentTime = new Date();
  const startTime = new Date(assessment.startTime);
  const endTime = new Date(assessment.endTime);
  const [assessmentQuestions, setAssessmentQuestions] = useState(
    assessment.questions.map((question) => ({ ...question, selected: "" })),
  );
  const [canTakeAssessment, setCanTakeAssessment] = useState(false);
  const [takeAssessment, setTakeAssessment] = useState(false);
  const [taken, setTaken] = useState(false);

  const toastId = "assessment-toast-id";

  const { mutate } = useMutation({
    mutationFn: assessmentsApi.submitAssessment,
    onMutate() {
      toast.loading("Submitting assessment", {
        id: toastId,
      });
    },
    onSuccess(data) {
      if (typeof data !== "undefined") {
        setCanTakeAssessment(false);
      } else {
        setCanTakeAssessment(true);
      }
      toast.success("Assessment submitted successfully", {
        id: toastId,
      });
    },
    onError(error) {
      console.error(`Error submitting assessment:`, error);
      toast.error("Failed to submit assessment", {
        id: toastId,
      });
    },
    onSettled() {
      setTaken(false);
    },
  });

  const updateQuestionState = (
    questionId: string | number,
    selected: string,
  ) => {
    const updatedQuestions = assessmentQuestions.map((question) => {
      if (question.id === questionId) {
        return { ...question, selected };
      }
      return question;
    });
    setAssessmentQuestions(updatedQuestions);
  };

  const submitAssessment = () => {
    const unansweredQuestions = assessmentQuestions.filter(
      (question) => question.selected === undefined || question.selected === "",
    );

    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    mutate({
      assessmentId: assessment._id,
      student: {
        student_id: student.student_id,
        student_name: student.student_name,
        reg_number: student.reg_number,
      },
      answers: assessmentQuestions.map((question) => ({
        question: {
          question_id: question.id,
          question_text: question.question_text,
          question_type: question.question_type,
        },
        answer_text: question.selected,
      })),
      submitted_at: new Date().toISOString(),
    });
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
            />
          )}
        </div>
      ))}
      <button
        className="bg-blue-600 p-3 rounded-lg text-white"
        onClick={submitAssessment}
      >
        Submit Assessment
      </button>
    </div>
  );
};

export default SubmitAssessment;
