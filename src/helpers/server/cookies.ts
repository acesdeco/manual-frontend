import type { IUser } from "@/api/auth";
import { setCookie } from "@tanstack/react-start/server";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function setUserCookie(data: IUser) {
  return setCookie("user", JSON.stringify(data), {
    httpOnly: true,
    maxAge: THIRTY_DAYS,
    expires: new Date(Date.now() + 1000 * THIRTY_DAYS),
    path: "/",
    sameSite: "strict",
    secure: import.meta.env.PROD,
  });
}
