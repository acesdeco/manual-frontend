import { getUserCookie, hasUserCookie } from '@/helpers/server/cookies'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    if (!hasUserCookie()) {
      throw new Error('Unauthorized!')
    }
    const result = await next({
      context: {
        user: getUserCookie(),
      },
    })
    return result
  },
)
