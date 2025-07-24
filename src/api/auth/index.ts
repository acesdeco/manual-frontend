import z from "zod";
import { api } from "../clients";
import {
  iUserSchema,
  loginSchema,
  signUpSchema,
  updateUserSchema,
  userIdSchema,
  type LoginInput,
  type SignUpInput,
  type UpdateUserInput,
  type UserId,
} from "./schema";
export * from "./schema";

export async function login(input: LoginInput) {
  loginSchema.parse(input);
  const resJson = await api
    .post("users/login", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function signUp(input: SignUpInput) {
  signUpSchema.parse(input);
  const resJson = await api
    .post("users/signup", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function updateUser(input: UpdateUserInput) {
  updateUserSchema.parse(input);
  const resJson = await api.put(`users/${input.userId}`, {
    json: input.data,
  });
  return iUserSchema.parse(resJson);
}

export async function deleteUser(userId: UserId) {
  userIdSchema.parse(userId);
  const resJson = await api.delete(`users/${userId}`);
  return z
    .object({
      message: z.string(),
    })
    .parse(resJson);
}

export async function getUser(userId: UserId) {
  userIdSchema.parse(userId);
  const resJson = await api.get(`users/${userId}`);
  return iUserSchema.parse(resJson);
}
