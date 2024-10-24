import Button from "../Button";
import { Link } from "@remix-run/react";
interface CourseCardProps {
  course: {
    courseName: string;
    courseLecturer: string;
    courseCode: string;
    courseTime: string;
    img?: string;
  };
  img?: string;
}
export const CourseCard = ({
  course: { courseName, courseLecturer, courseCode, courseTime, img },
}: CourseCardProps) => {
  return (
    <div className="w-full min-w-32 shadow-lg p-4 shadow-gray-300 text-gray-900">
      <figure>
        <img
          className="h-1/2"
          alt="course description"
          src={img ? img : "/amico.png"}
        ></img>
      </figure>
      <article>
        <h3 className="text-xl font-semibold">{courseName}</h3>
        <span className="flex justify-between">
          <span>{courseCode}</span>
          <span>{courseTime}</span>
        </span>
        <footer className="flex flex-row justify-between my-3">
          <h3>{courseLecturer}</h3>
          <Link to={"/courses"} className="w-fit">
            <Button>Go to course</Button>
          </Link>
        </footer>
      </article>
    </div>
  );
};
