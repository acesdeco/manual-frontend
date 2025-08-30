import { api, parseApiResponse } from "@/api/utils";
import { setUserCookie } from "@/helpers/server/cookies";
import { handleServerFnError } from "@/utils/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  authResultSchema,
  iLoginSchema,
  iSignupSchema,
  sLoginSchema,
  sSignUpSchema,
} from "./schema";

export * from "./schema";

export const sLoginFn = createServerFn({ method: "POST" })
  .validator(zodValidator(sLoginSchema))
  .handler(async ({ data }) => {
    try {
      const res = await api
        .post("users/login", {
          json: data,
        })
        .json();
      const user = parseApiResponse(res, authResultSchema);
      setUserCookie(data.role, user);
    } catch (error) {
      return handleServerFnError(error);
    }
    throw redirect({
      to: "/dashboard/courses",
      from: "/login",
    });
  });

export const sSignUpFn = createServerFn({ method: "POST" })
  .validator(zodValidator(sSignUpSchema))
  .handler(async ({ data }) => {
    try {
      const res = await api
        .post("users/signup", {
          json: sSignUpSchema
            .omit({
              confirmPassword: true,
            })
            .parse(data),
        })
        .json();
      const user = parseApiResponse(res, authResultSchema);
      setUserCookie(data.role, user);
    } catch (error) {
      return handleServerFnError(error);
    }
    throw redirect({
      to: "/dashboard/courses",
      from: "/signup",
    });
  });

export const iLoginFn = createServerFn({ method: "POST" })
  .validator(zodValidator(iLoginSchema))
  .handler(async ({ data }) => {
    try {
      const res = await api
        .post("users/login", {
          json: data,
        })
        .json();
      const user = parseApiResponse(res, authResultSchema);
      setUserCookie(data.role, user);
    } catch (error) {
      return handleServerFnError(error);
    }
    throw redirect({
      to: "/dashboard/courses",
      from: "/login",
    });
  });

export const iSignupFn = createServerFn({ method: "POST" })
  .validator(zodValidator(iSignupSchema))
  .handler(async ({ data }) => {
    try {
      const res = await api
        .post("users/signup", {
          json: iSignupSchema
            .omit({
              confirmPassword: true,
            })
            .parse(data),
        })
        .json();
      const user = parseApiResponse(res, authResultSchema);
      setUserCookie(data.role, user);
    } catch (error) {
      return handleServerFnError(error);
    }
    throw redirect({
      to: "/dashboard/courses",
      from: "/signup",
    });
  });
