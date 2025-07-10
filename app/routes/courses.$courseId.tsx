import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { Link, Outlet, redirect, useLoaderData, useParams } from "react-router";
import { getCourse, getCoursesByUserId, type ICourse } from "~/axios/Courses";
import { user as userState } from "~/serverstate.server";
import type { Route } from "./+types/courses.$courseId";
import union from "~/assets/images/Union.png?url";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data || !data.course) {
    return [
      { title: "Course 1" },
      { name: "description", content: "View Courses" },
    ];
  }
  return [
    { title: data.course.title },
    { name: "description", content: "View Courses" },
  ];
};

export default function Course() {
  const params = useParams(); // Get the parameters from the URL
  const courseId = params.courseId;
  const { course, userCourses } = useLoaderData<typeof loader>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Access the `userId` parameter
  if (
    !userCourses ||
    !courseId ||
    userCourses.filter((course) => course._id === courseId).length === 0
  ) {
    return (
      <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed p-4">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl text-gray-900 font-bold mb-4">
            Course Details
          </h1>
          <p className="text-lg text-gray-900 mb-4">
            You are not enrolled in this course. Please make a payment to access
            the course content.
          </p>
          <Link
            to={`/payment/${courseId}`}
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            Go to Payment
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <header className="w-[100%] bg-white h-fit flex flex-row items-center justify-between bg-transparent px-10 py-5">
        <div id="left">
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
      <Outlet context={{ course, isMenuOpen }}></Outlet>
    </main>
  );
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const { courseId } = params as { courseId: string };
  const cookie = (await userState.parse(cookieHeader)) || {};
  if (cookie.user) {
    const response = await getCoursesByUserId(cookie.user._id);
    const courseResponse = await getCourse(courseId);
    return {
      course: courseResponse,
      userCourses: response.data as ICourse[],
    };
  } else {
    return redirect("/auth/login");
  }
}
