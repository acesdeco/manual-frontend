import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server"
import { type UserCookie, userCookieSchema } from "@/functions/auth"
import { type User } from "@/schemas"

const secondsIn30Days = 60 * 60 * 24 * 30
function cookieOptions() {
  return {
    httpOnly: true,
    path: "/",
    maxAge: secondsIn30Days,
    sameSite: import.meta.env.PROD ? "none" : undefined,
    secure: import.meta.env.PROD || undefined,
    expires: new Date(Date.now() + 1000 * secondsIn30Days),
  } satisfies NonNullable<Parameters<typeof setCookie>[2]>
}

export function setUserCookie(
  role: User["role"],
  cookie: Omit<UserCookie, "role">,
) {
  setCookie(
    "user",
    JSON.stringify({
      ...cookie,
      role,
    }),
    cookieOptions(),
  )
}

export function hasUserCookie() {
  return Boolean(getCookie("user"))
}

export function getUserCookie() {
  const cookie = getCookie("user")!
  const json = JSON.parse(cookie)
  // console.log(json);
  return userCookieSchema.parse(json)
}

export function deleteUserCookie() {
  deleteCookie("user")
}
