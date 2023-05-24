import { useQuery } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

import { useAuthContext } from "../context/useAuthContext"

const useUser = () => {
  const { isLoggedIn } = useAuthContext()

  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return client.get("/users")
    },
    enabled: isLoggedIn,
  })
}

export default useUser
