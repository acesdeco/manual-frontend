import { getUserCookie, hasUserCookie } from '@/helpers/server/cookies'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    if (!hasUserCookie()) {
      throw new Error('Unauthorized!', {
        cause: 'Client is not signed in',
      })
    }
    return next({
      context: {
        user: getUserCookie(),
      },
    })
  },
)

export const instructorMiddleware = createMiddleware({ type: 'function' })
  .middleware([authMiddleware])
  .server(({ next, context }) => {
    if (context.user.role !== 'instructor') {
      throw new Error('Unauthorized!', {
        cause: 'Only instructors are allowed',
      })
    }
    return next()
  })
