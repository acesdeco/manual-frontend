import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { iLoginSchema, iSignupSchema } from './schema'
import { api } from '@/api/clients'
import { userSchema } from '@/schemas'
import { setUserCookie } from '@/helpers/server/cookies'
import { redirect } from '@tanstack/react-router'

export * from './schema'

export const iLoginFn = createServerFn({ method: 'POST' })
  .validator(zodValidator(iLoginSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post('users/login', {
        json: data,
      })
      .json()
    const user = userSchema.parse(res)
    setUserCookie(user)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses',
      from: '/auth/login/instructor',
    })
  })

export const iSignupFn = createServerFn({ method: 'POST' })
  .validator(zodValidator(iSignupSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post('users/signup', {
        json: data,
      })
      .json()
    const user = userSchema.parse(res)
    setUserCookie(user)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses',
      from: '/auth/signup/instructor',
    })
  })
