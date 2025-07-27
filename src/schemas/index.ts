import z, { ZodType } from 'zod'

export const registrationNumberSchema = z
  .string()
  .regex(/^[1][5-9]|[2][0-4]\/EG\/CO\/[0-9]{1,4}$/, {
    message: 'Invalid computer engineering matric number',
  })

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const userSchema = z.object({
  _id: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  registrationNumber: registrationNumberSchema,
  courses: z.array(z.string()).optional(),
  role: z.enum(['student', 'instructor']),
})
export type User = z.infer<typeof userSchema>
export type UserRole = User['role']

export const courseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  code: z.string(),
  description: z.string(),
  instructor: z.object({
    name: z.string(),
    id: z.string(),
  }),
  courseImage: z.url().optional(),
  coursePrice: z.number(),
  slug: z.string(),
  introduction: z.object({
    video: z.url(),
    notes: z.string(),
  }),
  weeks: z.record(
    z.number(),
    z.object({
      video: z.url(),
      assessment: z.string(),
      notes: z.string(),
      topic: z.string(),
    }),
  ),
  published: z.boolean(),
})
export type Course = z.infer<typeof courseSchema>

export function parseResponse<T>(value: unknown, schema: ZodType<T>) {
  return z
    .object({
      data: schema,
    })
    .parse(value).data
}
