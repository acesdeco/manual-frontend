import { Link } from "@tanstack/react-router";
import Button from "../Button";
import type { ICourse } from "@/api/courses";
import amico from "@/assets/images/amico.png?url";

export const CourseCard = (course: ICourse) => {
  return (
    <div className="min-w-32 rounded-md cursor-pointer w-full shadow-lg p-4 shadow-gray-300 text-gray-900">
      <figure className="h-52">
        <img
          className="w-full h-full object-cover rounded-md"
          alt="course description"
          src={course.courseImage ? course.courseImage : amico}
        />
      </figure>
      <article>
        <h3 className="text-xl text-gray-900 py-2 font-semibold">
          {course.title}
        </h3>
        <span className="flex justify-between">
          <span>{course.code}</span>
          <span>2 hours</span>
        </span>
        <footer className="flex flex-row justify-between my-3">
          <h3>{course.instructor.name}</h3>
          <Link
            to="/courses/$courseId/introduction"
            params={{
              courseId: course._id,
            }}
            className="w-fit"
          >
            <Button>Go to course</Button>
          </Link>
        </footer>
      </article>
    </div>
  );
};
