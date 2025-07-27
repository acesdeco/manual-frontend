import { api } from '@/api/clients'
import { instructorMiddleware } from '@/middleware'
import { courseSchema, parseResponse } from '@/schemas'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { iCreateCourseSchema } from './schema'

export * from './schema'

export const iGetCoursesByUserFn = createServerFn({ method: 'GET' })
  .middleware([instructorMiddleware])
  .handler(async ({ context }) => {
    const res = await api.get(`course/creator/${context.user._id}`).json()
    const { data: courses } = parseResponse(courseSchema.array(), res)
    return courses
  })

export const iCreateCourseFn = createServerFn({ method: 'POST' })
  .middleware([instructorMiddleware])
  .validator(zodValidator(iCreateCourseSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post('course', {
        json: data,
      })
      .json()
    const course = parseResponse(courseSchema, res).data
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses/$slug/edit',
      from: '/dashboard/courses/new',
      params: {
        slug: course.slug,
      },
    })
  })
