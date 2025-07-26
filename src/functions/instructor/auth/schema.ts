import z from 'zod'

export const iLoginSchema = z.object({
  email: z.email(),
})
