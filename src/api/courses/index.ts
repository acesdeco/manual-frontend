import {
  courseSchema,
  parseResponse,
  userSchema,
  weekSchema,
  type User,
} from "@/schemas";
import { api } from "../clients";
import {
  addWeekSchema,
  updateCourseSchema,
  updateWeekSchema,
  type AddWeek,
  type UpdateCourse,
  type UpdateWeek,
} from "./schema";
import z from "zod";

export * from "./schema";

export async function getAllCourses() {
  const res = await api.get("course").json();
  return parseResponse(res, courseSchema.array().default([]));
}

export async function getCourseBySlug(slug: string) {
  courseSchema.shape.slug.parse(slug);
  const res = await api.get(`course/slug/${slug}`).json();
  return parseResponse(res, courseSchema);
}

export async function getWeeksByCourseId(courseId: string) {
  courseSchema.shape._id.parse(courseId);
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

async function getUsersEnrolledCourseIds(userId: User["_id"]) {
  userSchema.shape._id.parse(userId);
  const res = await api.get(`users/courses/${userId}`).json();
  return parseResponse(res, z.string().array());
}

export async function getCoursesByUserId(userId: User["_id"]) {
  userSchema.shape._id.parse(userId);
  const [userCourses, allCourses] = await Promise.all([
    getUsersEnrolledCourseIds(userId),
    getAllCourses(),
  ]);
  return allCourses.filter((course) => userCourses.includes(course._id));
}
