import union from "@/assets/images/Union.png?url";
import { DatePicker } from "@/components/global/date-picker";
import { NavLink } from "@/components/global/nav-link";
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
} from "@tanstack/react-router";
import clsx from "clsx";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard" },
      { name: "description", content: "View Courses" },
    ],
  }),
  component: DashboardLayout,
});

const locations = linkOptions([
  {
    label: "Courses",
    to: "/dashboard/courses",
    role: "all",
  },
  {
    label: "Enrolled",
    to: "/dashboard/enrolled",
    role: "student",
  },
  {
    label: "Resources",
    to: "/dashboard/resources",
    role: "student",
  },
  {
    label: "Notifications",
    to: "/dashboard/notifications" as never,
    role: "instructor",
  },
]);

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBottomUp, setIsBottomUp] = useState(false);
  const { role } = Route.useRouteContext();
  return (
    <main className="w-[100vw] min-h-[100vh] bg-[#f9f9f9] flex flex-col /fixed">
      <header className="w-[100%] bg-white h-fit md:h-[15%] flex flex-row items-center py-5 justify-between bg-transparent px-10">
        <div className="left">
          <Link from={Route.fullPath} className="w-5" to="/dashboard/courses">
            <img alt="Union" src={union} />
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <div className="md:flex hidden flex-row items-center mx-10 border border-gray-200 rounded-lg ">
            <input
              className="text-black bg-transparent focus:outline-none focus:border-gray-500 px-3 p-1 rounded-l-md"
              type="text"
              placeholder="Search for a course"
            />
            <button
              type="submit"
              className="w-full h-full rounded-r-md bg-blue-600 p-1 px-4 border border-blue-600"
            >
              Search
            </button>
          </div>
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
      <section className="bg-transparent w-6/6 px-4 md:px-10 gap-2 mt-4 md:mt-10 flex flex-col md:flex-row justify-between items-start relative w-[100%]">
        <aside
          className={`absolute md:static bg-white px-3 z-50 pt-10 h-full duration-500 w-[300px] ${
            isMenuOpen
              ? "left-0 w-[270px]"
              : "-left-[120%] md:left-0 md:w-[270px] text-wrap"
          }`}
        >
          <ul className="w-[100%]">
            {locations
              .filter((link) => link.role === "all" || link.role === role)
              .map((location) => (
                <li className="w-full" key={location.label}>
                  <NavLink {...location} />
                </li>
              ))}
          </ul>
        </aside>

        <main
          className={clsx(
            "relative h-full py-5 duration-150 bg-white flex flex-col w-screen md:w-full overflow-x-clip px-5 overflow-y-auto",
            isMenuOpen && "-ml-6 md:ml-0",
          )}
        >
          <Outlet />
        </main>
        <button
          onClick={() => setIsBottomUp(!isBottomUp)}
          className="md:hidden bottom-32 right-10 absolute z-50 p-4 rounded-full bg-blue-500"
        >
          {isBottomUp ? (
            <IoIosArrowDown size={20} color="#ffffff" />
          ) : (
            <IoIosArrowUp size={20} color="#ffffff" />
          )}
        </button>
        {/* <aside
          className={clsx(
            "absolute md:static bg-gray-600 px-3 z-40 pt-10 h-fit duration-500 w-full md:w-1/6",
            isBottomUp
              ? "bottom-0 w-[270px]"
              : "-bottom-[100%] md:left-0 w-0 text-wrap",
          )}
        >
          <DatePicker />
        </aside> */}
      </section>
    </main>
  );
}
