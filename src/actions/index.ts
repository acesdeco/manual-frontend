// TODO handle errors
import { setCookie } from "@tanstack/react-start/server";

const secondsIn30Days = 60 * 60 * 24 * 30;
export const cookieOptions = {
  httpOnly: true,
  path: "/",
  maxAge: secondsIn30Days,
  sameSite: "strict",
  secure: import.meta.env.PROD,
} satisfies NonNullable<Parameters<typeof setCookie>[3]>;
