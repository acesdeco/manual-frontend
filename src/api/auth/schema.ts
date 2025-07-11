import z from "zod";
import { regNumberSchema } from "../schema";

export const iUserSchema = z.object({
  _id: z.string(),
  email: z.email(),
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  registrationNumber: regNumberSchema,
  courses: z.array(z.string()).optional(),
  role: z.string().optional(),
});
export type IUser = z.infer<typeof iUserSchema>;

export const loginSchema = z.object({
  password: z.string(),
  regNumber: regNumberSchema,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
    email: z.email(),
    regNumber: regNumberSchema,
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["student"]),
  })
  .refine((input) => input.password === input.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpInput = z.infer<typeof signUpSchema>;

export const updateUserSchema = z.object({
  userId: z.string(),
  data: iUserSchema.partial(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
