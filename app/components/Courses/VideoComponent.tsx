import { useState } from "react";

interface VideoComponentProps {
  content: contentProps;
}
interface contentProps {
  [key: string]: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  content,
}: VideoComponentProps) => {
  const [activeTab, setActiveTab] = useState("notes");
  return (
    <div className="video-component">
      <div className="">
        <h2 className="text-gray-600 font-semibold text-xl mt-1 mb-4">{content.topic}</h2>
        <p className="text-gray-600 my-4">{content.description}</p>
      </div>
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="400"
          src={content.video}
          title={content.topic}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        ></iframe>
      </div>
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
          className={`tab text-gray-800  px-4 pb-1 ${activeTab === "comments" ? "border-b-2  border-blue-600" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={`tab text-gray-800  px-4 pb-1 ${activeTab === "assessments" ? "border-b-2  border-blue-600" : ""}`}
          onClick={() => setActiveTab("assessments")}
        >
          Assessments
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "notes" && <div className="text-gray-700">{content.notes}</div>}
        {activeTab === "comments" && (
          <div className="text-gray-700">No comments yet</div>
        )}
         {activeTab === "assessments" && (
          <div className="text-gray-700">No assessments yet</div>
        )}
      </div>
    </div>
  );
};
export default VideoComponent;
