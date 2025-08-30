import AllAssessments from "@/components/assments/all-assessment";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import clsx from "clsx";
import { useState } from "react";

export const Route = createFileRoute("/_app/courses/$slug/introduction")({
  component: Introduction,
});

const courseLayout = getRouteApi("/_app/courses/$slug");

const tabs = ["Notes", "Comments", "Assessments"] as const;

function Introduction() {
  const { course, studentInfo } = courseLayout.useLoaderData();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Notes");
  return (
    <main className="bg-white w-full h-[90%] p-4 overflow-auto">
      <div className="video-component">
        <div className="">
          {/* NOTE TOPIC */}
          <h2 className="text-gray-600 font-semibold text-xl mt-1 mb-4">
            Introductory Video
          </h2>
          {/* NOTE DESCRIPTION */}
          <p className="text-gray-600 my-4">
            Introduction to This Particular Course
          </p>
        </div>
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="400"
            src={course.introduction?.video ?? ""}
            title={course.introduction?.topic ?? ""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl"
          />
        </div>
        <div
          className={
            activeTab === "Assessments"
              ? "w-full h-full fixed top-0 bg-white transform fade-in-bottom"
              : "tab-content"
          }
        >
          <div className="my-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={clsx(
                  "tab text-gray-800 mr-4  px-4 pb-1",
                  activeTab === tab ? "border-b-2 border-blue-600" : "",
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {activeTab === "Notes" && (
              <div className="text-gray-700">{course.introduction?.notes}</div>
            )}
            {activeTab === "Comments" && (
              <div className="text-gray-700">No comments yet</div>
            )}
            {activeTab === "Assessments" && (
              // @ts-expect-error TODO
              <AllAssessments user={studentInfo} weekId={weekId} />
            )}
          </div>
        </div>
      </div>
      {/* <CourseVideo
        user={studentInfo}
        content={course.weeks[0] ?? course.weeks[1]}
        weekId={"1"}
      /> */}
    </main>
  );
}
