import { courseSchema, parseResponse } from '@/schemas'
import { api } from '../clients'

export async function getAllCourses() {
  const res = await api.get('course').json()
  return parseResponse(res, courseSchema.array().default([]))
}

export async function getCourseBySlug(slug: string) {
  courseSchema.shape.slug.parse(slug)
  const res = await api.get(`course/slug/${slug}`).json()
  return parseResponse(res, courseSchema)
}

export async function getWeeksByCourseId(courseId: string) {
  courseSchema.shape._id.parse(courseId)
  const res = await api.get(`course/weeks/${courseId}`)
  return parseResponse(res, courseSchema.array())
}
