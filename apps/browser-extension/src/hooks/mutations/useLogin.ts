import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import type { UserResponse } from "./useRegister"

export type LoginData = {
  email: string
  password: string
}

export const useLogin = () => {
  return useMutation<UserResponse, unknown, LoginData>({
    mutationFn: (data) => {
      return client.post("/users/login", data)
    },
  })
}
