import ky, { type KyResponse } from "ky";
import z from "zod";

// const BASE_API_URL = "https://manual-backend-production-b53b.up.railway.app";
const BASE_API_URL = "http://localhost:3000";

export const api = ky.create({
  prefixUrl: new URL("/api/v1", BASE_API_URL),
});

export function parseApiResponse<V, T>(
  value: V,
  schema: V extends KyResponse ? never : z.ZodType<T>,
) {
  return z
    .object({
      data: schema as z.ZodType<T>,
    })
    .parse(value).data;
}
