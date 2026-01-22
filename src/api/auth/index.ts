import { api } from "../utils"
import {
  type UpdateUserInput,
  updateUserResult,
  updateUserSchema,
} from "./schema"
import { parseResponse } from "@/schemas"

export * from "./schema"

// FIXME MOVE TO A FUNCTION
export async function updateUser(input: UpdateUserInput) {
  updateUserSchema.parse(input)
  const res = await api
    .put(`users/${input.userId}`, {
      json: input.data,
    })
    .json()
  return parseResponse(res, updateUserResult)
}
