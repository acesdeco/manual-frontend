import { authResultSchema } from "@/functions/auth";
import { parseResponse } from "@/schemas";
import { api } from "../utils";
import { updateUserSchema, type UpdateUserInput } from "./schema";

export * from "./schema";

// FIXME MOVE TO A FUNCTION
export async function updateUser(input: UpdateUserInput) {
  updateUserSchema.parse(input);
  const res = await api
    .put(`users/${input.userId}`, {
      json: input.data,
    })
    .json();
  return parseResponse(res, authResultSchema);
}
