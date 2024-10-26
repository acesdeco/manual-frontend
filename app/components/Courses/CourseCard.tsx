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
    <div className=" min-w-32 rounded-md cursor-pointer w-full shadow-lg p-4 shadow-gray-300 text-gray-900">
      <figure>
        <img
          className="h-1/2"
          alt="course description"
          src={img ? img : "/amico.png"}
        ></img>
      </figure>
      <article className="w-full">
        <h3 className="md:text-xl font-semibold">{courseName}</h3>
        <span className="flex justify-between">
          <span>{courseCode}</span>
          <span>{courseTime}</span>
        </span>
        <footer className="flex w-full md:flex-row flex-col gap-2 justify-between my-3">
          <h3>{courseLecturer}</h3>
          <Link to={"/courses"} className="md:w-fit w-full">
            <Button className="w-full text-white bg-[#1671D9] py-1 px-2 rounded">
              Go to course
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  );
};
