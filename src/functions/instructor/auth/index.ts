import { api } from "@/api/clients";
import { setUserCookie } from "@/helpers/server/cookies";
import { parseResponse, userCookieSchema } from "@/schemas";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { iLoginSchema, iSignupSchema } from "./schema";

export * from "./schema";

export const iLoginFn = createServerFn({ method: "POST" })
  .validator(zodValidator(iLoginSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post("users/login", {
        json: data,
      })
      .json();
    const user = parseResponse(
      res,
      userCookieSchema.omit({
        role: true,
      }),
    );
    setUserCookie(data.role, user);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: "/dashboard/courses",
      from: "/auth/login/instructor",
    });
  });

export const iSignupFn = createServerFn({ method: "POST" })
  .validator(zodValidator(iSignupSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post("users/signup", {
        json: data,
      })
      .json();
    const user = parseResponse(
      res,
      userCookieSchema.omit({
        role: true,
      }),
    );
    setUserCookie(data.role, user);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: "/dashboard/courses",
      from: "/auth/signup/instructor",
    });
  });
