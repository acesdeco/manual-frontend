import { coursesApi } from "@/api";
import type { UpdateWeek } from "@/api/courses";
import { Assessments } from "@/components/assments/assessments";
import CourseEditor from "@/components/courses/course-editor";
import { HeaderComp } from "@/components/global/header";
import Overloader from "@/components/global/overloader";
import Toggle from "@/components/global/toggle";
import { instructorOnly } from "@/functions/global";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/_app/dashboard/courses/$slug/edit")({
  validateSearch: zodValidator(
    z.object({
      week: z
        .number()
        .positive()
        .catch(1)
        .optional()
        .transform((val) => (typeof val === "number" ? val : 1)),
    }),
  ),
  component: RouteComponent,
  beforeLoad: async () => await instructorOnly(),
  loader: async ({ params }) => {
    const course = await coursesApi.getCourseBySlug(params.slug);
    const weeks = await coursesApi.getWeeksByCourseId(course._id);
    return { course, weeks };
  },
});

const tabs = ["materials", "assessment", "submissions"] as const;

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("materials");
  const { course, weeks } = Route.useLoaderData();
  const { week: weekSearchParam } = Route.useSearch();
  const week = useMemo(
    () => weeks[weekSearchParam - 1] ?? null,
    [weekSearchParam, weeks],
  );
  const [isWeeksOpen, setIsWeeksOpen] = useState(true);
  const { mutate: togglePublish, isPending: isTogglingPublish } = useMutation({
    mutationFn: async () => {
      await coursesApi.updateCourse({
        courseId: course._id,
        update: {
          published: !course.published,
        },
      });
      await router.invalidate();
    },
    onError(error) {
      console.error("Error toggling published status:", error);
      toast.error("Unable to toggle published status");
    },
  });

  const { mutate: updateWeek, isPending: isUpdatingWeek } = useMutation({
    mutationFn: async (input: UpdateWeek) => {
      if (!week) return;
      await coursesApi.updateWeek(input);
      await navigate({
        to: ".",
        search: {
          week: input.update.weekNumber,
        },
      });
    },
    onError(error) {
      console.error("Error updating week:", error);
      toast.error("Unable to update week");
    },
  });

  const { mutate: createWeek, isPending: isCreatingWeek } = useMutation({
    mutationFn: async () => {
      const result = await coursesApi.addWeek({
        courseId: course._id,
        week: {
          weekNumber: weeks.length + 1,
          topic: "Untitled",
          notes: "",
          video: "",
        },
      });
      await navigate({
        to: ".",
        search: {
          week: result.weekNumber,
        },
      });
    },
    onError(error) {
      console.error("Error adding week:", error);
      toast.error("Unable to add new week");
    },
  });

  const isLoading = useMemo(
    () => isTogglingPublish || isUpdatingWeek || isCreatingWeek,
    [isCreatingWeek, isTogglingPublish, isUpdatingWeek],
  );

  return (
    <div className=" w-[100vw] h-[100vh] fixed overflow-y-auto">
      <HeaderComp />
      <Overloader isLoading={isLoading} />
      <section className="bg-blue-200 text-black w-full h-[90%] fixed pb-0">
        <div className="bg-[#0000ff] justify-between flex items-center text-white px-10 py-4">
          <div className="flex items-center">
            <span className="cursor-pointer">
              <IoIosArrowBack size={30} />
            </span>
            <p className="text-xl font-semibold">
              <Link to="/dashboard/courses">Course</Link> / {course.title}
            </p>
          </div>
          <label className="flex items-center gap-3">
            <span>{course.published ? "Published" : "Publish"}</span>
            <Toggle toggle={togglePublish} isToggled={course?.published} />
          </label>
        </div>
        <div className="h-[90%] flex">
          <div className="left flex h-full flex-col gap-4 pl-8 pr-5 py-4 bg-[#F3F4F5] w-1/4">
            <h3 className="text-xl font-semibold">Course Upload</h3>
            {!course ? (
              <div>Failed to get course Data</div>
            ) : (
              <div className="flex gap-4 h-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Content</h3>
                  <div className="flex items-center gap-4">
                    <button
                      className="cursor-pointer"
                      onClick={() => createWeek()}
                    >
                      <BiPlus size={22} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsWeeksOpen(!isWeeksOpen)}
                    >
                      <IoIosArrowDown size={22} />
                    </button>
                  </div>
                </div>
                <div
                  className={clsx(
                    "weeks flex flex-col duration-300 gap-3",
                    isWeeksOpen ? "h-full" : "h-0 overflow-hidden",
                  )}
                >
                  {weeks.length < 1 ? (
                    <div className="h-full justify-center flex-col items-center w-full flex">
                      <p className="text-sm">No Weeks added yet</p>
                      <p className="flex items-center font-medium">
                        Press <BiPlus size={25} /> to add week
                      </p>
                    </div>
                  ) : (
                    weeks.map((aWeek, index) => (
                      <Link
                        to="."
                        search={{
                          week: index + 1,
                        }}
                        key={aWeek._id}
                        className={clsx(
                          `cursor-pointer hover:bg-slate-400 flex text-sm items-center gap-2 p-2 rounded-md`,
                          weekSearchParam === index + 1 && "bg-slate-200 ",
                        )}
                      >
                        <span className="w-8 flex justify-center items-center h-8 bg-[#A9D4FF] rounded-full">
                          0{index + 1}
                        </span>
                        <p className="font-medium ">{aWeek.topic}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right px-6 pt-6 gap-5 w-full h-full bg-white pb-10 overflow-auto  flex flex-col text-black">
            <div className="flex text-lg font-medium gap-3 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={clsx(
                    "cursor-pointer border-b-4 px-4 capitalize",
                    activeTab === tab
                      ? "text-[#0080FF] border-[#0080FF]"
                      : "border-transparent",
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {activeTab === "materials" && week && (
                <CourseEditor submit={updateWeek} week={week} />
              )}
              {activeTab === "assessment" && <Assessments weekId={week._id} />}
              {activeTab === "submissions" && (
                <div>
                  {/* TODO */}
                  {/* <SubmissionsFlow
                    user={{
                      name: user.fullName as string,
                      id: user.user || user._id,
                    }}
                    courseId={course._id as string}
                    weekId={week!._id as string}
                  ></SubmissionsFlow> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
