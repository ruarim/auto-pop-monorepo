import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import type { LoginData } from "./useLogin"

export type User = { id: number; email: string; token: string }
export type UserResponse = {
  data: User
}

const useRegister = () => {
  return useMutation<UserResponse, unknown, LoginData>({
    mutationFn: (data) => {
      return client.post("/users/register", data)
    },
  })
}

export default useRegister
