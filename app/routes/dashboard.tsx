//import { Link } from "@remix-run/react";
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Outlet, Link , useLoaderData} from "@remix-run/react";
import { NavLinkTs } from "~/components/NavLink";
import {user as userState} from "~/serverstate.server";

import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "View Courses" },
  ];
};
const locations = [
  {
    item: "Courses",
    location: "/dashboard/courses",
  },
  {
    item: "Enrolled",
    location: "/dashboard/enrolled",
  },
  {
    item: "Resources",
    location: "/dashboard/resources",
  },
];
export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <header className="w-[100%] bg-white h-[15%] flex flex-row items-center  py-5 justify-between bg-transparent px-10">
        <div id="left">
          <Link className="w-5" to="/dashboard/course">
            <img alt="Union" src="/Union.png"></img>
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
              <BiMenuAltRight size={30} color="#1671d9" />
            </button>
          </div>
        </div>
      </header>
      <hr />
      <section className="h-[85%] bg-transparent relative w-fit  gap-1  flex flex-row justify-between items-start">
        <aside
          className={`bg-white px-3 relative pt-10 h-full duration-500 md:w-1/4  ${
            isMenuOpen
              ? "left-0 w-[270px]"
              : "-left-[120%] md:left-0 w-0 text-wrap"
          }`}
        >
          <ul className="w-full">
            {locations.map((location, y) => (
              <li className="w-full" key={y}>
                <NavLinkTs
                  location={location.location}
                  item={location.item}
                ></NavLinkTs>
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

        <main
          className={`relative h-full py-5 duration-150   flex w-screen md:w-full overflow-x-clip px-5 overflow-y-auto ${
            isMenuOpen ? "" : "-ml-6 md:ml-0"
          }`}
        >
          <Outlet></Outlet>
        </main>
        {/* <aside className="w-1/6 bg-white"> */}
        {/* Robust date and event section */}
        {/* <MyDatePicker></MyDatePicker> */}
        {/* </aside> */}
      </section>
    </main>
  );
}


export async function loader({
  request,
}: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userState.parse(cookieHeader)) || {};
  console.log(cookie);
  return json({ user: cookie.user });
}