import type { Assessment } from "@/api/assments/schema";
import { updateSubmission } from "@/api/submissions";
import type { Submission } from "@/api/submissions/schema";
import { submissionsByAssessmentOptions } from "@/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type FC } from "react";
import { toast } from "sonner";

type SubmissionsListProps = {
  assessmentId: Assessment["_id"];
  closeSubmissionsList: () => void;
};

type Mode =
  | { view: "all" }
  | { view: "single"; submisionId: Submission["_id"] };

export const SubmissionsList: FC<SubmissionsListProps> = ({
  assessmentId,
  closeSubmissionsList,
}) => {
  const queryClient = useQueryClient();
  const queryOptions = useMemo(
    () => submissionsByAssessmentOptions(assessmentId),
    [assessmentId],
  );
  const { isPending, data, error } = useQuery(queryOptions);
  const [_mode, setMode] = useState<Mode>({
    view: "all",
  });

  const mode = useMemo(() => {
    switch (_mode.view) {
      case "all":
        return _mode;
      case "single":
        return {
          ..._mode,
          submission:
            data?.find((value) => value._id === _mode.submisionId) ?? null,
        };
    }
  }, [_mode, data]);

  const { mutate, isPending: updatingSubmission } = useMutation({
    mutationFn: updateSubmission,
    async onMutate({ id, update }) {
      toast.loading("Updating submision", {
        id,
      });
      await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
      const previousItems = queryClient.getQueryData(queryOptions.queryKey);
      queryClient.setQueryData(queryOptions.queryKey, (items) =>
        items?.map((item) =>
          item._id === id
            ? {
                ...item,
                ...update,
              }
            : item,
        ),
      );
      return { previousItems };
    },
    onSuccess(_, { id }) {
      toast.loading("Submission updated!", {
        id,
      });
    },
    onError(error, { id }, context) {
      console.error("Error updating submission:", error);
      toast.error("Failed to update submission", {
        id,
      });
      if (context?.previousItems) {
        queryClient.setQueryData(queryOptions.queryKey, context.previousItems);
      }
    },
  });

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="loader"></div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) throw error;

  switch (mode.view) {
    case "single": {
      return !mode.submission ? (
        <div>No submission data available</div>
      ) : (
        <div>
          <button
            className="text-blue-600 underline mb-2"
            onClick={closeSubmissionsList}
          >
            Back to Submissions
          </button>
          <h2 className="text-xl font-bold mb-4">Submission Details</h2>
          <div>
            {mode.submission.answers.map((answer, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">Question {index + 1}</h3>
                <p>{answer.question.question_text}</p>
                {answer.question.question_type === "objective" ? (
                  <>
                    <p>
                      <strong>Given Answer:</strong> {answer.answer_text}
                    </p>
                    <p>
                      <strong>Correct Answer:</strong> {answer.answer_text}
                    </p>
                    <p>
                      <strong>Score:</strong> {answer.marks_obtained}
                    </p>
                  </>
                ) : (
                  <>
                    {/* <p>
                  <strong>Given Answer:</strong> {answer.answer_text}
                </p> */}
                    <p>
                      <strong>Given Answer:</strong>
                      <textarea
                        disabled
                        contentEditable={false}
                        value={answer.answer_text}
                      ></textarea>
                      <p>
                        <strong>Score:</strong> {answer.marks_obtained}
                      </p>
                      <button
                        className="text-blue-600 underline disabled:cursor-not-allowed"
                        disabled={updatingSubmission}
                        onClick={() => {
                          // TODO show an alert dialog
                          const newScore = prompt(
                            "Enter the score for this answer:",
                          );
                          if (newScore !== null) {
                            const updatedSubmission = {
                              ...mode.submission!,
                            } satisfies Submission;
                            updatedSubmission.answers[index].marks_obtained =
                              parseFloat(newScore);
                            mutate({
                              id: mode.submisionId,
                              update: updatedSubmission,
                            });
                          }
                        }}
                      >
                        Grade
                      </button>
                    </p>
                  </>
                )}

                {/* <p>
              <strong>Score:</strong> {answer}
            </p> */}
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "all": {
      return (
        <section>
          <button
            className="text-blue-600 underline mb-2"
            onClick={closeSubmissionsList}
          >
            Back
          </button>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Student Name</th>
                <th className="py-2">Student Registration Number</th>
                <th className="py-2">Current Score</th>
                <th className="py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {data.map((submission) => (
                <tr key={submission._id}>
                  <td className="border px-4 py-2">
                    {submission.student.student_name}
                  </td>
                  <td className="border px-4 py-2">
                    {submission.student.reg_number}
                  </td>
                  <td className="border px-4 py-2">{submission.total_score}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        setMode({
                          view: "single",
                          submisionId: submission._id,
                        })
                      }
                      className="text-blue-600 underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    }
  }
};
