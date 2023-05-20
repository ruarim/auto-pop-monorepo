export const DEV_ENV = true //set to false in prod
export const DOMAIN = ".depop.com"
export const ACCESS_COOKIE_NAME = "access_token="
export const USER_COOKIE_NAME = "user_id"
export const DEPOP_API_ENDPOINT = "https://webapi.depop.com/api"
export const BACKEND_API_ENDPOINT = DEV_ENV
  ? "http://localhost:3000"
  : "DEPLOYED ENDPOINT"
