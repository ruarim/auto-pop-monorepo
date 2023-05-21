import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import type { UserResponse } from "./useRegister"

type SetDepopTokenData = {
  token: string
}
const useSetDepopToken = () => {
  return useMutation<UserResponse, unknown, SetDepopTokenData>({
    mutationFn: (data) => {
      return client.post("/users/depopToken", data)
    },
  })
}

export default useSetDepopToken
