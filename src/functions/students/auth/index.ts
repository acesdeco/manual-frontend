import { api } from '@/api/clients'
import { setUserCookie } from '@/helpers/server/cookies'
import { userSchema } from '@/schemas'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { studentsLoginSchema, studentsSignUpSchema } from './schema'

export * from './schema'

export const studentsLoginFn = createServerFn({ method: 'POST' })
  .validator(zodValidator(studentsLoginSchema))
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
      from: '/auth/login/students',
    })
  })

export const studentsSignUpFn = createServerFn({ method: 'POST' })
  .validator(zodValidator(studentsSignUpSchema))
  .handler(async ({ data }) => {
    const res = await api
      .post('users/signup', {
        json: studentsSignUpSchema
          .omit({
            confirmPassword: true,
          })
          .parse(data),
      })
      .json()
    const user = userSchema.parse(res)
    setUserCookie(user)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/dashboard/courses',
      from: '/auth/signup/students',
    })
  })
