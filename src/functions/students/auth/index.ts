import { api } from "@/api/clients";
import { setUserCookie } from "@/helpers/server/cookies";
import { parseResponse, userCookieSchema } from "@/schemas";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { sLoginSchema, sSignUpSchema } from "./schema";

export * from "./schema";

export const sLoginFn = createServerFn({ method: "POST" })
  .validator(zodValidator(sLoginSchema))
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
      from: "/auth/login/students",
    });
  });

export const sSignUpFn = createServerFn({ method: "POST" })
  .validator(zodValidator(sSignUpSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post("users/signup", {
        json: sSignUpSchema
          .omit({
            confirmPassword: true,
          })
          .parse(data),
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
      from: "/auth/signup/students",
    });
  });
