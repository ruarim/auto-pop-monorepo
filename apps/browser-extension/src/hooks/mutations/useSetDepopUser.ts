import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import type { UserResponse } from "./useRegister"

type SetDepopTokenData = {
  depopToken: string
  depopId: number
}

const useSetDepopToken = () => {
  return useMutation<UserResponse, unknown, SetDepopTokenData>({
    mutationFn: (data) => {
      return client.post("/users/depopUser", data)
    },
  })
}

export default useSetDepopToken
