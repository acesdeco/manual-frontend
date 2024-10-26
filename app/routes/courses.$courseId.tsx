//import { Link } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, Link, useParams, useLoaderData, json} from "@remix-run/react";
import { getCourse } from "~/axios/Courses";
// import { NavLinkTs } from "~/components/NavLink";
import {user as userState} from "~/serverstate.server";
export const meta: MetaFunction = () => {
  return [
    { title: "Course 1" },
    { name: "description", content: "View Courses" },
  ];
};

export default function Course() {
  const params = useParams(); // Get the parameters from the URL
  const courseId = params.courseId;
  const {user, course} = useLoaderData<typeof loader>();
  // Access the `userId` parameter
  if(!user.courses || user.courses.includes(courseId) === false) {
    return (
      <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl text-gray-900 font-bold mb-4">Course Details</h1>
          <p className="text-lg text-gray-900 mb-4">You are not enrolled in this course. Please make a payment to access the course content.</p>
          <Link to={`/payment/${courseId}`} className="bg-blue-600 text-white p-2 rounded-lg">
            Go to Payment
          </Link>
        </div>
      </main>
    )
  }
  return (
    <main className="w-[100vw] h-[100vh] bg-[#f9f9f9] flex flex-col fixed">
      <header className="w-[100%] bg-white h-[15%] flex flex-row items-center justify-between bg-transparent px-10 py-5">
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
     <Outlet context={course}></Outlet>
    </main>
  );
}

export async function loader({
  request,
  params,
}: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const {courseId} = params as {courseId: string};
  const cookie = (await userState.parse(cookieHeader)) || {};
  const response = await getCourse(courseId);
  return json({ user: cookie.user, course: response });
}
