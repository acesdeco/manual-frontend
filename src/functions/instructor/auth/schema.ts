import { passwordSchema, userSchema } from '@/schemas'
import z from 'zod'

const instructorRole = z.literal('instructor').catch('instructor')

export const iLoginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
  role: instructorRole,
})
export type InstructorLogin = z.infer<typeof iLoginSchema>

export const iSignupSchema = z
  .object({
    ...userSchema.pick({
      email: true,
      firstName: true,
      lastName: true,
    }).shape,
    role: instructorRole,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })
export type InstructorSignUp = z.infer<typeof iSignupSchema>
