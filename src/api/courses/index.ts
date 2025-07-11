import z from "zod";
import { api } from "../clients";
import { getAllCoursesResult, iCourseSchema } from "./schema";

export * from "./schema";

export async function getAllCourses() {
  const resJson = await api.get("course").json();
  return getAllCoursesResult.parse(resJson);
}

export async function getUsersEnrolledCourses(userId: string) {
  z.string().parse(userId);
  const resJson = await api.get(`users/courses/${userId}`).json();
  return z.array(z.string()).parse(resJson);
}

export async function getCoursesByUserId(userId: string) {
  z.string().parse(userId);
  const [userCourses, allCourses] = await Promise.all([
    getUsersEnrolledCourses(userId),
    getAllCourses(),
  ]);
  return allCourses.data.filter((course) =>
    userCourses.includes(course._id as string)
  );
}

export async function getCourse(courseId: string) {
  z.string().parse(courseId);
  const resJson = await api.get(`course/${courseId}`).json();
  return iCourseSchema.parse(resJson);
}
