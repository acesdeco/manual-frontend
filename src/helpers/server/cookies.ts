import type { User } from '@/schemas'
import { getCookie, setCookie } from '@tanstack/react-start/server'

const secondsIn30Days = 60 * 60 * 24 * 30
function cookieOptions() {
  return {
    httpOnly: true,
    path: '/',
    maxAge: secondsIn30Days,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
    expires: new Date(Date.now() + 1000 * secondsIn30Days),
  } satisfies NonNullable<Parameters<typeof setCookie>[3]>
}

export function setUserCookie(user: User) {
  setCookie('user', JSON.stringify(user), cookieOptions())
}

export function hasUserCookie() {
  return Boolean(getCookie('user'))
}
