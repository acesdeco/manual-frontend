import { authResultSchema } from "@/functions/auth";
import { userSchema } from "@/schemas";
import z from "zod";

export const updateUserSchema = z.object({
  userId: userSchema.shape._id,
  data: userSchema.partial(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const updateUserResult = z
  .object({
    _id: authResultSchema.shape.user,
    firstName: z.string(),
    lastName: z.string(),
    ...authResultSchema.omit({
      token: true,
      user: true,
      fullName: true,
    }).shape,
  })
  .transform(({ _id, firstName, lastName, ...data }) => ({
    ...data,
    user: _id,
    token: "",
    fullName: `${firstName} ${lastName}`,
  })) satisfies z.ZodType<z.infer<typeof authResultSchema>>;
