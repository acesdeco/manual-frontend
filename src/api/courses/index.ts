import {
  courseSchema,
  parseResponse,
  weekSchema,
  type Course
} from "@/schemas";
import z from "zod";
import { api } from "../utils";
import {
  addWeekSchema,
  updateCourseSchema,
  updateWeekSchema,
  type AddWeek,
  type UpdateCourse,
  type UpdateWeek,
} from "./schema";

export * from "./schema";

export async function getAllCourses() {
  const res = await api.get("course").json();
  return parseResponse(res, courseSchema.array().default([]));
}

export async function getCourseBySlug(slug: string) {
  z.string();
  const res = await api.get(`course/slug/${slug}`).json();
  return parseResponse(res, courseSchema);
}

export async function getWeeksByCourseId(courseId: Course["_id"]) {
  courseSchema.in.shape._id.parse(courseId);
  const res = await api.get(`course/weeks/${courseId}`).json();
  return parseResponse(res, weekSchema.array().default([]));
}

export async function updateCourse(input: UpdateCourse) {
  updateCourseSchema.parse(input);
  const res = await api
    .put(`course/${input.courseId}`, {
      json: input.update,
    })
    .json();
  return parseResponse(res, courseSchema);
}

export async function updateWeek(input: UpdateWeek) {
  updateWeekSchema.parse(input);
  const res = await api
    .put(`course/week/${input.weekId}`, {
      json: input.update,
    })
    .json();
  return parseResponse(res, weekSchema);
}

export async function addWeek(input: AddWeek) {
  addWeekSchema.parse(input);
  const res = await api
    .post(`course/${input.courseId}/week`, {
      json: input.week,
    })
    .json();
  return parseResponse(res, weekSchema);
}

export async function getUsersEnrolledCourses(userId: string) {
  z.string().parse(userId);
  const res = await api.get(`users/courses/${userId}`).json();
  return parseResponse(res, courseSchema.array());
}

export async function getCourse(courseId: string) {
  z.string().parse(courseId);
  const res = await api.get(`course/${courseId}`).json();
  return parseResponse(res, courseSchema);
}
