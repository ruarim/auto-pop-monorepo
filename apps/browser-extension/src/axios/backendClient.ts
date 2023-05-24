import axios from "axios"

import { BACKEND_API_ENDPOINT } from "~globals"

const client = axios.create({
  baseURL: BACKEND_API_ENDPOINT,
})

client.interceptors.request.use(
  (config) => {
    const acces_token = localStorage.getItem("token")

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
