import z from "zod";

export const registrationNumberSchema = z
  .string()
  .regex(/^[1][5-9]|[2][0-4]\/EG\/CO\/[0-9]{1,4}$/);
