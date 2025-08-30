import { getUserCookie, hasUserCookie } from "@/helpers/server/cookies";
import { notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const redirectUsers = createServerFn({ method: "GET" }).handler(() => {
  if (hasUserCookie()) {
    throw redirect({
      to: "/dashboard/courses",
    });
  }
});

export const redirectGuests = createServerFn({ method: "GET" }).handler(() => {
  if (!hasUserCookie()) {
    throw redirect({
      to: "/login",
    });
  }
});

export const getUserData = createServerFn({ method: "POST" }).handler(() => {
  const user = getUserCookie();
  return { user, role: user.role };
});

export const instructorOnlyFn = createServerFn({ method: "GET" }).handler(
  () => {
    const user = getUserCookie();
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (user.role !== "instructor") throw notFound();
  },
);

export const studentOnlyFn = createServerFn({ method: "GET" }).handler(() => {
  const user = getUserCookie();
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  if (user.role !== "student") throw notFound();
});
