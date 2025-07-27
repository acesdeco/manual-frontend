import { hasUserCookie } from '@/helpers/server/cookies'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const redirectUsers = createServerFn({ method: 'GET' }).handler(() => {
  if (hasUserCookie()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses',
    })
  }
})
