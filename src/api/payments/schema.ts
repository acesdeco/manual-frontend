import z from "zod";

export const verifyPaymentResult = z.object({
  status: z.enum(["failed", "success"]),
});

export const paymentSchema = z.object({
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

export type Payment = z.infer<typeof paymentSchema>;

export const initializePaymentSchema = paymentSchema.omit({
  _id: true,
  authorization_url: true,
});

export const initializePaymentResult = paymentSchema.omit({
  callback_url: true,
});

export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>;
