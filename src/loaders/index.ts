import { iUserSchema } from "@/api/auth";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const redirectUser = createServerFn({ method: "GET" }).handler(() => {
  if (getCookie("user")) {
    throw redirect({
      to: "/dashboard/courses",
    });
  }
});

export const redirectGuest = createServerFn({ method: "GET" }).handler(() => {
  if (!getCookie("user")) {
    throw redirect({
      to: "/auth/login",
    });
  }
});

export const getUserData = createServerFn({ method: "GET" }).handler(() => {
  const userCookie = getCookie("user")!;
  const parsedUser = JSON.parse(userCookie);
  return iUserSchema.parse(parsedUser);
});
