import { coursesApi } from "@/api";
import union from "@/assets/images/Union.png?url";
import { NavLink } from "@/components/global/nav-link";
import { studentOnlyFn } from "@/functions/global";
import { authMiddleware } from "@/middleware";
import { assessmentByWeekOptions } from "@/queries";
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import clsx from "clsx";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import z from "zod";

const courseLoader = createServerFn({ method: "GET" })
  .validator(
    zodValidator(
      z.object({
        courseId: z.string(),
      }),
    ),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context: { user } }) => {
    const [course, userCourses] = await Promise.all([
      coursesApi.getCourse(data.courseId),
      coursesApi.getUsersEnrolledCourseIds(user._id),
    ]);
    if (!userCourses.includes(data.courseId)) return "NotEnrolled";
    return {
      course,
      studentInfo: {
        student_id: user._id,
        student_name: `${user.firstName} ${user.lastName}`,
        reg_number: user.registrationNumber,
      },
    };
  });

class NotEnrolledError extends Error {}

export const Route = createFileRoute("/_app/courses/$courseId")({
  component: CourseLayout,
  beforeLoad: async () => await studentOnlyFn(),
  loader: async ({ params, context }) => {
    const result = await courseLoader({
      data: params,
    });
    if (result === "NotEnrolled") {
      throw new NotEnrolledError();
    }
    void context.queryClient.prefetchQuery(
      assessmentByWeekOptions(result.course._id),
    );
    return result;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData?.course.title ?? `Course ${params.courseId}` },
      { name: "description", content: "View Courses" },
    ],
  }),
  errorComponent: NotEnrolled,
});

function NotEnrolled({ error }: ErrorComponentProps) {
  if (!(error instanceof NotEnrolledError)) throw error;
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed p-4">
      <div className="flex flex-col items-center justify-center h-full">
        {/* FIXME */}
        <h1 className="text-2xl text-gray-900 font-bold mb-4">
          Course Details
        </h1>
        <p className="text-lg text-gray-900 mb-4">
          You are not enrolled in this course. Please make a payment to access
          the course content.
        </p>
        <Link
          to={"/payment/$courseId/pay" as never}
          mask={{
            to: "/payment/$courseId/$" as never,
          }}
          from={Route.fullPath}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          Go to Payment
        </Link>
      </div>
    </main>
  );
}

function CourseLayout() {
  const { course } = Route.useLoaderData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locations = Object.keys(course.weeks).map((week) =>
    linkOptions({
      to: "/courses/$courseId/$week",
      params: {
        week: week,
      },
      label: `Week ${+week + 1}`,
      from: Route.fullPath,
    }),
  );
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <header className="w-[100%] bg-white h-fit flex flex-row items-center justify-between bg-transparent px-10 py-5">
        <div className="left">
          <Link className="w-5" to="/dashboard/courses">
            <img alt="Union" src={union} />
          </Link>
        </div>
        <div className="flex flex-row items-center">
          {/* <div className="flex flex-row items-center mx-10 border border-gray-200 rounded-lg ">
            <input
              className="text-black bg-transparent focus:outline-none focus:border-gray-500 px-3 p-1 rounded-l-md"
              type="text"
              placeholder="Search for a course"
            />
            <button
              type="submit"
              className="w-full h-full rounded-r-md bg-blue-600 p-1 px-4 border border-blue-600"
            >
              {" "}
              Search
            </button>
          </div> */}
          <div className="w-6 mx-4">
            <IoNotificationsOutline size={30} color="#1671d9" />
          </div>
          <div className="flex items-center gap-1 flex-row justify-center">
            <div className="w-6 ">
              <IoPersonCircleOutline size={30} color="#1671d9" />
            </div>
            <div className="md:flex hidden gap-3 justify-center items-center">
              <button>
                <IoIosArrowDown size={20} color="#1671d9" />
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer md:hidden"
            >
              {isMenuOpen ? (
                <IoIosClose size={30} color="#1671d9" />
              ) : (
                <BiMenuAltRight size={30} color="#1671d9" />
              )}
            </button>
          </div>
        </div>
      </header>
      <hr />
      <section className="h-[85%] bg-transparent w-6/6 md:mx-10 mx-0 gap-4 mt-0 md:mt-10 flex flex-row justify-between items-start">
        <aside
          className={clsx(
            "absolute md:static bg-white  px-3 z-50 pt-10 h-full duration-500 w-[300px]",
            isMenuOpen
              ? "left-0 w-[270px]"
              : "-left-[120%] md:left-0 w-0 text-wrap",
          )}
        >
          <ul className="w-full">
            {locations.map((location) => (
              <li className="w-full" key={location.label}>
                <NavLink {...location} />
              </li>
            ))}
            {/* This is a v2 feature */}
            {/* <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive
                ? "text-gray-900 bg-blue-600"
                : isPending
                ? "pending"
                : ""
            }
            to={"dashboard/courses"}
          >
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive
                ? "text-gray-900 bg-blue-600"
                : isPending
                ? "pending"
                : ""
            }
            to={"dashboard/courses"}
          >
            Courses
          </NavLink>
        </li> */}
          </ul>
        </aside>
        <Outlet />
      </section>
    </main>
  );
}
