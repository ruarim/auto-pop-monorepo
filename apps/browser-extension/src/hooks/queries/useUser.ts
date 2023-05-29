import { useQuery } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import { useAuthContext } from "../context/useAuthContext"
import type { UserResponse } from "../mutations/useRegister"

const useUser = () => {
  const { isLoggedIn } = useAuthContext()

  return useQuery<UserResponse>({
    queryKey: ["user", isLoggedIn],
    queryFn: () => {
      return client.get("/users")
    },
    enabled: isLoggedIn,
  })
}

export default useUser
