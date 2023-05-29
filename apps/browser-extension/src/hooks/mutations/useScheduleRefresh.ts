import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import type { UserResponse } from "./useRegister"

type SetRefreshScheduleData = {
  schedule: number
}

const useSetRefreshSchedule = () => {
  return useMutation<UserResponse, unknown, SetRefreshScheduleData>({
    mutationFn: (data) => {
      return client.post("/users/refreshSchedule", data)
    },
  })
}

export default useSetRefreshSchedule
