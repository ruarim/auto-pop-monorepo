import axios from "axios"

import { ACCESS_COOKIE_NAME, DEPOP_API_ENDPOINT } from "~globals"
import { getCookie } from "~src/utils/getCookie"

const client = axios.create({
  baseURL: DEPOP_API_ENDPOINT,
})

client.interceptors.request.use(
  (config) => {
    const acces_token = getCookie(ACCESS_COOKIE_NAME)

    // Do something before request is sent
    return {
      ...config,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${acces_token}`,
      },
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default client
