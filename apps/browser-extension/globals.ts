export const DOMAIN = ".depop.com"
export const ACCESS_COOKIE_NAME = "access_token="
export const USER_COOKIE_NAME = "user_id"
export const DEPOP_API_ENDPOINT = "https://webapi.depop.com/api"
export const BACKEND_API_ENDPOINT =
  process.env.DEV_ENV === "true"
    ? "http://localhost:3000"
    : process.env.BACKEND_URL
