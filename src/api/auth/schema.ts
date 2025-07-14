import z from "zod";
import { registrationNumberSchema } from "../schema";

export type UserId = string & {
  readonly __brand: "userId";
};
export const userIdSchema = z
  .custom<UserId>((val) => z.string().safeParse(val).success, {
    error: "Invalid user id",
  })
  .transform((val) => val as string);

export const iUserSchema = z.object({
  _id: userIdSchema,
  email: z.email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  registrationNumber: registrationNumberSchema,
  courses: z.array(z.string()).optional(),
  role: z.enum(["student"]),
});
export type IUser = z.infer<typeof iUserSchema>;

export const loginSchema = z.object({
  password: z.string(),
  regNumber: registrationNumberSchema,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signUpSchema = iUserSchema
  .omit({
    _id: true,
    courses: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpInput = z.infer<typeof signUpSchema>;

export const updateUserSchema = z.object({
  userId: userIdSchema,
  data: iUserSchema.partial(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
