import { useOutletContext } from "@remix-run/react";
import { ICourse } from "~/axios/Courses";
import { NavLinkTs } from "~/components/NavLink";
import LessonComponent from "~/components/Courses/VideoComponent";
export default function Week() {
    const course = useOutletContext<ICourse>();
    const weeks = course.weeks;
    const locations = Object.keys(weeks).map((weekNumber) => ({
      location: `/courses/${course._id}/${weekNumber}`,
      item: `Week ${weekNumber}`,
    }));
    return (
        <section className="h-[85%] bg-transparent w-6/6 mx-10 gap-4 mt-10 flex flex-row justify-between items-start">
        <aside className=" w-2/6">
          <ul className="w-full">
          <li className="w-full" >
                <NavLinkTs
                  location={'/courses/' + course._id + '/introduction'}
                  item={'Introduction'}
                ></NavLinkTs>
              </li>
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
          <LessonComponent content={{...course.introduction, description: "Introduction to This Particular Course", topic: "Introductory Video"}} />
        </main>
      </section>
    )
}