import { useQuery } from "@tanstack/react-query"

import client from "~src/axios/backendClient"

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return client.get("/users")
    },
  })
}

export default useUser
