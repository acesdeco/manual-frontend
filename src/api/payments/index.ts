import z from "zod";
import { api } from "../clients";
import {
  initializePaymentResult,
  initializePaymentSchema,
  verifyPaymentResult,
  type InitializePaymentInput,
} from "./schema";

export * from "./schema";

export async function initializePayment(input: InitializePaymentInput) {
  initializePaymentSchema.parse(input);
  const resJson = await api
    .post("payment/initialize", {
      json: input,
    })
    .json();
  return initializePaymentResult.parse(resJson);
}

export async function verifyPayment(reference: string) {
  z.string().parse(reference);
  const resJson = await api.get(`payment/verify/${reference}`).json();
  return verifyPaymentResult.parse(resJson);
}
