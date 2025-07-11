import z from "zod";

export const iPaymentSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  amount: z.number(),
  paymentDate: z.string(),
  status: z.string(),
  email: z.email(),
  callback_url: z.url(),
  authorization_url: z.url(),
});
export type IPayment = z.infer<typeof iPaymentSchema>;

export const initializePaymentSchema = iPaymentSchema.omit({
  _id: true,
  authorization_url: true,
});
export const initializePaymentResult = iPaymentSchema.omit({
  callback_url: true,
});
export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>;

export const verifyPaymentResult = z.object({
  status: z.enum(["failed", "success"]),
});
