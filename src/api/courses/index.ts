import { courseSchema, parseResponse } from '@/schemas'
import { api } from '../clients'

export async function getAllCourses() {
  const res = await api.get('course').json()
  return parseResponse(courseSchema.array().default([]), res).data
}
