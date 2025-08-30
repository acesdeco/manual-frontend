import type { Assessment } from "@/api/assments/schema";
import { assessmentByWeekOptions } from "@/queries";
import type { Week } from "@/schemas";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { Loader } from "../global/loader";
import { SubmissionsList } from "./submissions-list";

type SubmissionProps = {
  weekId: Week["_id"];
};

type View =
  | { state: "assessments" }
  | { state: "submissions"; assessmentsId: Assessment["_id"] };

export const SubmissionFlow: FC<SubmissionProps> = ({ weekId }) => {
  const { data, isPending, error } = useQuery(assessmentByWeekOptions(weekId));
  const [view, setView] = useState<View>({ state: "assessments" });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) throw error;

  switch (view.state) {
    case "submissions": {
      return (
        <SubmissionsList
          assessmentId={view.assessmentsId}
          closeSubmissionsList={() => {
            setView({
              state: "assessments",
            });
          }}
        />
      );
    }
    case "assessments": {
      return (
        <section>
          {data.length ? (
            <ul>
              {data.map((assessment) => (
                <li key={assessment._id} className="py-2">
                  <button
                    onClick={() =>
                      setView({
                        state: "submissions",
                        assessmentsId: assessment._id,
                      })
                    }
                    className="bg-blue-300 p-2 py-4 w-full text-left rounded-md"
                  >
                    <h3>Submissions for {assessment.title}</h3>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p>You have no submissions for this week</p>
            </>
          )}
        </section>
      );
    }
  }

  return <></>;
};
