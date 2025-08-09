import {
  passwordSchema,
  registrationNumberSchema,
  userSchema,
} from "@/schemas";
import z from "zod";

const studentsRole = z.literal("student").catch("student");

export const sLoginSchema = z.object({
  password: passwordSchema,
  registrationNumber: registrationNumberSchema,
  role: studentsRole,
});

export type StudentLogin = z.infer<typeof sLoginSchema>;

export const sSignUpSchema = userSchema
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
    path: ["confirmPassword"],
  });

export type StudentSignUp = z.infer<typeof sSignUpSchema>;

const instructorRole = z.literal("instructor").catch("instructor");

export const iLoginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
  role: instructorRole,
});

export type InstructorLogin = z.infer<typeof iLoginSchema>;

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
    path: ["confirmPassword"],
  });

export type InstructorSignUp = z.infer<typeof iSignupSchema>;

export const authResultSchema = z.object({
  token: z.jwt(),
  user: z.string(),
  email: z.email(),
  registrationNumber: registrationNumberSchema.or(z.literal("")),
  fullName: z.string(),
  courses: z.string().array().default([]),
});
export const userCookieSchema = authResultSchema.extend({
  role: userSchema.shape.role,
});
export type UserCookie = z.infer<typeof userCookieSchema>;
