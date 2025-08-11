import z from "zod";
import { api, parseApiResponse } from "../utils";
import { parseResponse } from "@/schemas";
import {
  initializePaymentResult,
  initializePaymentSchema,
  verifyPaymentResult,
  type InitializePaymentInput,
} from "./schema";

export * from "./schema";

export async function verifyPayment(reference: string) {
  z.string().parse(reference);
  const res = await api.get(`payment/verify/${reference}`).json();
  return parseResponse(res, verifyPaymentResult);
}

export async function initializePayment(input: InitializePaymentInput) {
  initializePaymentSchema.parse(input);
  const res = await api
    .post("payment/initialize", {
      json: input,
    })
    .json();
  return parseApiResponse(res, initializePaymentResult);
}
