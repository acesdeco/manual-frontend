//import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { CourseCard } from "~/components/Courses/CourseCard";
export const meta: MetaFunction = () => {
    return [
      { title: "Courses" },
      { name: "description", content: "View Courses" },
    ];
  };
const course = {
    courseCode: "CPE 311",
    courseLecturer: "Engr. Udofia",
    courseTime: "2 hours",
    courseName: "Applications of Programming",
}
export default function dashboard() {
    return (
        <>
        <header className="mb-10">
            <h1 className="text-black text-2xl font-semibold">
                Courses
            </h1>
        </header>
        <section className="grid grid-cols-2 gap-3">
            <CourseCard course={course}></CourseCard>
            <CourseCard course={course}></CourseCard>
            <CourseCard course={course}></CourseCard>
            <CourseCard course={course}></CourseCard>
        </section>
        </>
    );
}