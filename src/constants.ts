export const APP_URL =
  process.env.APP_URL || process.env.RAILWAY_PRIVATE_DOMAIN
    ? `https://${process.env.RAILWAY_PRIVATE_DOMAIN}`
    : process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"
