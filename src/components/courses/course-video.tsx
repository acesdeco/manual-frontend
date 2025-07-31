import type { Week } from "@/schemas";
import type { Student } from "@/types";
import { useState, type FC } from "react";
import AllAssessments from "../assments/all-assessment";

interface CourseVideoProps {
  content: Week;
  user: Student;
  weekId: Week["_id"];
}

export const CourseVideo: FC<CourseVideoProps> = ({
  content,
  user,
  weekId,
}) => {
  const [activeTab, setActiveTab] = useState("notes");
  return (
    <div className="video-component">
      <div className="">
        <h2 className="text-gray-600 font-semibold text-xl mt-1 mb-4">
          {content.topic}
        </h2>
        <p className="text-gray-600 my-4">{content.assessment}</p>
      </div>
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="400"
          src={content.video}
          title={content.topic}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        />
      </div>
      <div
        className={
          activeTab === "assessments"
            ? "w-full h-full fixed top-0 bg-white transform fade-in-bottom"
            : "tab-content"
        }
      >
        <div className="my-4">
          <button
            className={`tab text-gray-800 mr-4  px-4 pb-1 ${
              activeTab === "notes" ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
          <button
            className={`tab text-gray-800  px-4 pb-1 ${
              activeTab === "comments" ? "border-b-2  border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
          <button
            className={`tab text-gray-800  px-4 pb-1 ${
              activeTab === "assessments" ? "border-b-2  border-blue-600" : ""
            }`}
            onClick={() => setActiveTab("assessments")}
          >
            Assessments
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "notes" && (
            <div className="text-gray-700">{content.notes}</div>
          )}
          {activeTab === "comments" && (
            <div className="text-gray-700">No comments yet</div>
          )}
          {activeTab === "assessments" && (
            <AllAssessments user={user} weekId={weekId} />
          )}
        </div>
      </div>
    </div>
  );
};
