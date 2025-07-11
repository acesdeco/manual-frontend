import ky from "ky";

const BASE_API_URL = "https://manual-backend-production-b53b.up.railway.app";

export const api = ky.create({
  prefixUrl: new URL("/api/v1", BASE_API_URL),
});
