import z from "zod";
import { api } from "../clients";
import {
  initializePaymentResult,
  initializePaymentSchema,
  verifyPaymentResult,
  type InitializePaymentInput,
} from "./schema";

export * from "./schema";

const client = api.extend((options) => ({
  prefixUrl: options.prefixUrl + "/payment",
}));

export async function initializePayment(input: InitializePaymentInput) {
  initializePaymentSchema.parse(input);
  const resJson = await client
    .post("initialize", {
      json: input,
    })
    .json();
  return initializePaymentResult.parse(resJson);
}

export async function verifyPayment(reference: string) {
  z.string().parse(reference);
  const resJson = await client.get(`verify/${reference}`).json();
  return verifyPaymentResult.parse(resJson);
}
