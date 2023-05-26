import { useQuery } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import { useAuthContext } from "../context/useAuthContext"

type User = {
  id: number
  email: string
  depopToken: string
  depopId: number
  refreshSchedule: number
  requests: number
}

type UserResponse = {
  data: User
}

const useUser = () => {
  const { isLoggedIn } = useAuthContext()

  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: () => {
      return client.get("/users")
    },
    enabled: isLoggedIn,
  })
}

export default useUser
