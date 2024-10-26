//import { Link } from "@remix-run/react";
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Outlet, Link, useLoaderData} from "@remix-run/react";
import { NavLinkTs } from "~/components/NavLink";
import {user as userState} from "~/serverstate.server";

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
export default function Dshboard() {
  const {user} = useLoaderData<typeof loader>();
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <header className="w-[100%] bg-white h-[15%] flex flex-row items-center  py-5 justify-between bg-transparent px-10">
        <div id="left">
            <Link className="w-5" to="/dashboard/course">
            <img alt="Union" src="/Union.png"></img>
            </Link>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center mx-10 border border-gray-200 rounded-lg ">
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
          </div>
          <div className="w-6 mx-4">
            <img src="/notification.png" alt="notification" />
          </div>
          <div className="flex flex-row justify-center">
            <div className="w-6 ">
              <img src="/notification.png" alt="avatar" id="avatar_img" />
            </div>
            <div id="dropdown">
              <button>
                <svg height="5px" width="10px" id="drop-btn">
                  <polyline points="0,0 5,5 10,0" />
                </svg>
              </button>
              {/* <div id="dropdown-content">
                <ul>
                  <li>
                    <a href="profile">
                      Profile <hr />
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a href="log-out">Log out</a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </header>
      <hr />
      <section className="h-[85%] bg-transparent w-6/6 mx-10 gap-4 mt-10 flex flex-row justify-between items-start">
        <aside className=" w-2/6">
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

        <main className="bg-white w-full h-[90%] p-4 overflow-auto">
          <Outlet context={user}></Outlet>
        </main>
        <aside className="w-1/6 bg-white">
        {/* Robust date and event section */}
          {/* <MyDatePicker></MyDatePicker> */}
        </aside>
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