import type { Course } from '@/schemas'
import amico from '@/assets/images/amico.png?url'
import type { FC, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

type CourseCardProps = {
  children: ReactNode
  course: Course
}

const CourseCard: FC<CourseCardProps> = ({ course, children }) => {
  return (
    <>
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
            {children}
          </footer>
        </article>
      </div>
    </>
  )
}

export const StudentsCourseCard: FC<Omit<CourseCardProps, 'children'>> = ({
  course,
}) => {
  return (
    <CourseCard course={course}>
      <Link
        to="/courses/$slug/introduction"
        params={{
          slug: course._id,
        }}
        className="w-fit"
      >
        <Button>Go to course</Button>
      </Link>
    </CourseCard>
  )
}

export const InstructorCourseCard: FC<Omit<CourseCardProps, 'children'>> = ({
  course,
}) => {
  return (
    <CourseCard course={course}>
      <Link
        to="/courses/$slug/introduction"
        params={{
          slug: course._id,
        }}
        className="w-fit"
      >
        <Button>Go to course</Button>
      </Link>
    </CourseCard>
  )
}
