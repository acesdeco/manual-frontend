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
  type UserId
} from "./schema";
export * from "./schema";

const client = api.extend((options) => ({
  prefixUrl: options.prefixUrl + "/users",
}));

export async function login(input: LoginInput) {
  loginSchema.parse(input);
  const resJson = await client
    .post("login", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function signUp(input: SignUpInput) {
  signUpSchema.parse(input);
  const resJson = await client
    .post("signup", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function updateUser(input: UpdateUserInput) {
  updateUserSchema.parse(input);
  const resJson = await client.put(input.userId, {
    json: input.data,
  });
  return iUserSchema.parse(resJson);
}

export async function deleteUser(userId: UserId) {
  userIdSchema.parse(userId);
  const resJson = await client.delete(userId);
  return z
    .object({
      message: z.string(),
    })
    .parse(resJson);
}

export async function getUser(userId: UserId) {
  userIdSchema.parse(userId);
  const resJson = await client.get(userId);
  return iUserSchema.parse(resJson);
}
