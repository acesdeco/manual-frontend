import { passwordSchema, registrationNumberSchema, userSchema } from '@/schemas'
import z from 'zod'

const studentsRole = z.literal('student').catch('student')

export const studentsLoginSchema = z.object({
  password: passwordSchema,
  registrationNumber: registrationNumberSchema,
  role: studentsRole,
})
export type StudentLogin = z.infer<typeof studentsLoginSchema>

export const studentsSignUpSchema = userSchema
  .omit({
    _id: true,
    courses: true,
    role: true,
  })
  .extend({
    password: passwordSchema,
    confirmPassword: z.string(),
    role: studentsRole,
  })
  .refine((input) => input.password === input.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })
export type StudentSignUp = z.infer<typeof studentsSignUpSchema>
