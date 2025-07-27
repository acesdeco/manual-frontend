import { api } from '@/api/clients'
import { authMiddleware } from '@/middleware'
import { parseResponse, courseSchema } from '@/schemas'
import { createServerFn } from '@tanstack/react-start'

export const getCoursesByThisCreatorsId = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await api.get(`course/creator/${context.user._id}`).json()
    const { data: courses } = parseResponse(courseSchema.array(), res)
    return courses
  })
