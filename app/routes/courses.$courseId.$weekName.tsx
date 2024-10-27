import { useOutletContext, useParams } from "@remix-run/react";
import { ICourse } from "~/axios/Courses";
import LessonComponent from "~/components/Courses/VideoComponent";
import { NavLinkTs } from "~/components/NavLink";
export default function Week() {
  const { course, isMenuOpen } = useOutletContext<{
    course: ICourse;
    isMenuOpen: boolean;
  }>();
  const weeks = course.weeks;
  const { weekName } = useParams<{ weekName: string }>();
  const locations = Object.keys(weeks).map((weekNumber) => ({
    location: `/courses/${course._id}/${weekNumber}`,
    item: `Week ${weekNumber}`,
  }));
  return (
    <section className="h-[85%] bg-transparent w-6/6 md:mx-10 mx-0 gap-4 mt-0 md:mt-10 flex flex-row justify-between items-start">
      <aside
        className={`absolute md:static bg-white  px-3 z-50 pt-10 h-full duration-500 w-[300px]  ${
          isMenuOpen
            ? "left-0 w-[270px]"
            : "-left-[120%] md:left-0 w-0 text-wrap"
        }`}
      >
        <ul className="w-full">
          <li className="w-full">
            <NavLinkTs
              location={"/courses/" + course._id + "/introduction"}
              item={"Introduction"}
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
        {weekName ? (
          <LessonComponent content={course.weeks[weekName]} />
        ) : (
          <div>Week not found</div>
        )}{" "}
      </main>
    </section>
  );
}
