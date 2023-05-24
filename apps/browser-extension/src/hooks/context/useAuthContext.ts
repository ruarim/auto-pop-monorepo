import { useContext } from "react"

import { AuthContext } from "~src/providers/AuthProvider"

export function useAuthContext() {
  return useContext(AuthContext)
}
