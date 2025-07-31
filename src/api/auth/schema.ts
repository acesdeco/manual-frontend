import { userSchema } from "@/schemas";
import z from "zod";

export const updateUserSchema = z.object({
  userId: userSchema.shape._id,
  data: userSchema.partial(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
