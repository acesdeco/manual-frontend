import { api } from "../clients";
import {
  iUserSchema,
  loginSchema,
  signUpSchema,
  updateUserSchema,
  type LoginInput,
  type SignUpInput,
  type UpdateUserInput,
} from "./schema";
export * from "./schema";

const userClient = api.extend((options) => ({
  prefixUrl: options.prefixUrl + "/users",
}));

export async function login(input: LoginInput) {
  loginSchema.parse(input);
  const resJson = await userClient
    .post("login", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function signUp(input: SignUpInput) {
  signUpSchema.parse(input);
  const resJson = await userClient
    .post("signup", {
      json: input,
    })
    .json();
  return iUserSchema.parse(resJson);
}

export async function updateUser(input: UpdateUserInput) {
  updateUserSchema.parse(input);
  const resJson = await userClient.put(input.userId, {
    json: input.data,
  });
  return iUserSchema.parse(resJson);
}
