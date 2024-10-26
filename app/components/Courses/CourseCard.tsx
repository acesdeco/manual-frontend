import Button from "../Button";
import { Link } from "@remix-run/react";
import { ICourse } from "~/axios/Courses";
interface ICourseCard {
  course: ICourse
}
export const CourseCard = ({course}: ICourseCard) => {
  return (
    <div className=" min-w-32 rounded-md cursor-pointer w-full shadow-lg p-4 shadow-gray-300 text-gray-900">
      <figure>
        <img
          className="h-1/2"
          alt="course description"
          src={course.courseImage ? course.courseImage : "/amico.png"}
        ></img>
      </figure>
      <article>
        <h3 className="text-xl text-gray-900 font-semibold">{course.title}</h3>
        <span className="flex justify-between">
          <span>{course.code}</span>
          <span>2 hours</span>
        </span>
        <footer className="flex flex-row justify-between my-3">
          <h3>{course.instructor}</h3>
          <Link to={`/courses/${course['_id']}/introduction`} className="w-fit">
            <Button>Go to course</Button>
          </Link>
        </footer>
      </article>
    </div>
  );
};
