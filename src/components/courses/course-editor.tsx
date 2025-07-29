import type { UpdateWeek } from "@/api/courses";
import type { Week } from "@/schemas";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Player from "react-player/lazy";
import "video-react/dist/video-react.css";
import Modal from "../global/modal";
import QuillEditor from "./quill-editor";

type CourseEditorProps = {
  week: Week;
  submit: (week: UpdateWeek) => void;
};

const tabs = ["notes", "slides", "video"] as const;

export default function CourseEditor({ week, submit }: CourseEditorProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("notes");
  const [weekTopicInp, setWeekTopicInp] = useState("");
  const [weekNotesInp, setWeekNotesInp] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleEditorChange = (change: string) => {
    setWeekNotesInp(change);
  };

  useEffect(() => {
    setWeekNotesInp(week.notes);
    setWeekTopicInp(week.topic);
    setVideoUrl(week.video);
  }, [week]);

  const handleEmbedVideo = () => {
    if (videoUrl) {
      submit({
        weekId: week._id,
        update: {
          weekNumber: week.weekNumber,
          video: videoUrl,
        },
      });
    }
    setIsVideoModalOpen(false);
  };

  const handleSubmit = () => {
    submit({
      weekId: week._id,
      update: {
        ...week,
        video: videoUrl,
        notes: weekNotesInp,
        topic: weekTopicInp,
      },
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div>
        <button
          onClick={handleSubmit}
          className="py-2  px-5 text-white bg-blue-700 rounded-md"
        >
          Save
        </button>
      </div>
      <input
        className="text-2xl hover:border-b py-2 text-black  font-semibold bg-transparent focus:outline-none"
        value={weekTopicInp}
        placeholder="Add Course"
        onChange={(e) => setWeekTopicInp(e.target.value)}
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            // setTopicInput("Add Course Topic...")
          }
        }}
      />
      <div className="flex gap-6 text-lg font-medium border-b">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "capitalize",
              activeTab == tab
                ? "border-b-2 border-blue-700"
                : "cursor-pointer",
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="flex h-[30vh] w-full flex-col">
        {activeTab == "notes" ? (
          <QuillEditor value={weekNotesInp} onChange={handleEditorChange} />
        ) : activeTab == "slides" ? (
          "This ought to be the the slides parts"
        ) : (
          <section className="w-full py-6">
            <Modal
              header="Embed Video Link"
              isModalOpen={isVideoModalOpen}
              //   setModalOpen={setIsVideoModalOpen}
              acceptText="Embed"
              onAccept={handleEmbedVideo}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  onChange={(e) => setVideoUrl(e.target.value)}
                  value={videoUrl}
                  placeholder="Enter Video URL"
                  className="border-2 bg-white border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </Modal>
            <div className="gap-3 flex flex-col w-full justify-center items-center">
              {week.video && (
                <div className="video-wrapper">
                  <Player url={videoUrl} />
                </div>
              )}
              <section className="flex gap-2">
                {/* <button className="bg-blue-700 rounded-md text-white py-2 px-4">
                  Upload a Video
                </button> */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-blue-700 rounded-md text-white py-2 px-4"
                >
                  {week.video ? "Change" : "Embed"} Video
                </button>
              </section>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
