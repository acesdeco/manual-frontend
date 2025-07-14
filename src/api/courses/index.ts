import z from "zod";
import { userIdSchema, type UserId } from "../auth";
import { api } from "../clients";
import {
  courseIdSchema,
  getAllCoursesResult,
  iCourseSchema,
  updateCourseSchema,
  type CourseId,
  type ICourse,
  type UpdateCourseInput,
} from "./schema";

export * from "./schema";

export async function getAllCourses() {
  const resJson = await api.get("course").json();
  return getAllCoursesResult.parse(resJson);
}

export async function getUsersEnrolledCourseIds(userId: UserId) {
  userIdSchema.parse(userId);
  const resJson = await api.get(`users/courses/${userId}`).json();
  return z.array(z.string()).parse(resJson);
}

export async function getCoursesByUserId(userId: UserId) {
  userIdSchema.parse(userId);
  const [userCourses, allCourses] = await Promise.all([
    getUsersEnrolledCourseIds(userId),
    getAllCourses(),
  ]);
  return allCourses.data.filter((course) => userCourses.includes(course._id));
}

export async function getCourse(courseId: CourseId) {
  courseIdSchema.parse(courseId);
  const resJson = await api.get(`course/${courseId}`).json();
  return iCourseSchema.parse(resJson);
}

export async function createCourse(input: ICourse) {
  iCourseSchema.parse(input);
  const resJson = await api
    .post("courses", {
      json: input,
    })
    .json();
  return iCourseSchema.parse(resJson);
}

export async function updateCourse(input: UpdateCourseInput) {
  updateCourseSchema.parse(input);
  const resJson = await api
    .put(`course/${input.id}`, {
      json: input.course,
    })
    .json();
  return iCourseSchema.parse(resJson);
}

export async function deleteCourse(id: CourseId) {
  courseIdSchema.parse(id);
  const resJson = await api.delete(`course/${id}`);
  return z
    .object({
      message: z.string(),
    })
    .parse(resJson);
}
