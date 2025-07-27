import { getUserCookie, hasUserCookie } from '@/helpers/server/cookies'
import { notFound, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const redirectUsers = createServerFn({ method: 'GET' }).handler(() => {
  if (hasUserCookie()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses',
    })
  }
})

export const redirectGuests = createServerFn({ method: 'GET' }).handler(() => {
  if (!hasUserCookie()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/auth/login/students',
    })
  }
})

export const getUserData = createServerFn({ method: 'POST' }).handler(() => {
  const user = getUserCookie()
  return { user, role: user.role }
})

export const instructorOnly = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { role } = await getUserData()
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (role !== 'instructor') throw notFound()
  },
)
