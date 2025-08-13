import z from "zod";

export const verifyPaymentResult = z.object({
  id: z.number(),
  domain: z.string(),
  status: z.literal(["success", "failed"]),
  reference: z.string(),
  receipt_number: z.string().nullable(),
  amount: z.number(),
  message: z.string().nullable(),
  gateway_response: z.string(),
  paid_at: z.iso.datetime(),
  created_at: z.iso.datetime(),
  channel: z.string(),
  currency: z.string(),
  ip_address: z.string(),
  metadata: z.object({
    referrer: z.string(),
  }),
  log: z.object({
    start_time: z.number(),
    time_spent: z.number(),
    attempts: z.number(),
    errors: z.number(),
    success: z.boolean(),
    mobile: z.boolean(),
    input: z.any().array(),
    history: z.any().array(),
  }),
  fees: z.number(),
  fees_split: z.any().nullable(),
  authorization: z.object({
    authorization_code: z.string(),
    bin: z.string(),
    last4: z.string(),
    exp_month: z.string(),
    exp_year: z.string(),
    channel: z.string(),
    card_type: z.string(),
    bank: z.string(),
    country_code: z.string(),
    brand: z.string(),
    reusable: z.boolean(),
    signature: z.string(),
    account_name: z.string().nullable(),
    receiver_bank_account_number: z.string().nullable(),
    receiver_bank: z.string().nullable(),
  }),
  customer: z.object({
    id: z.number(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    email: z.string(),
    customer_code: z.string(),
    phone: z.string().nullable(),
    metadata: z.any().nullable(),
    risk_action: z.string(),
    international_format_phone: z.string().nullable(),
  }),
  plan: z.any().nullable(),
  split: z.object({}),
  order_id: z.any().nullable(),
  paidAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  requested_amount: z.number(),
  pos_transaction_data: z.any().nullable(),
  source: z.any().nullable(),
  fees_breakdown: z.any().nullable(),
  connect: z.any().nullable(),
  transaction_date: z.iso.datetime(),
  plan_object: z.object({}),
  subaccount: z.object({}),
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

export const initializePaymentResult = z.object({
  authorization_url: z.url(),
  access_code: z.string(),
  reference: z.string(),
});

export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>;
