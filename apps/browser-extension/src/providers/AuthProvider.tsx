import { useQueryClient } from "@tanstack/react-query"
import React, { createContext, useEffect, useState } from "react"

import type { UserResponse } from "~src/hooks/mutations/useRegister"

type RegisterFunction = (data: UserResponse) => void
type LoginFunction = (data: UserResponse) => void
type LogoutFunction = () => void

export interface AuthContextInterface {
  registerHandler: RegisterFunction
  logout: LogoutFunction
  loginHandler: LoginFunction
  isLoggedIn: boolean
}

const AuthContext = createContext<Partial<AuthContextInterface>>({
  registerHandler: (data) => undefined,
  loginHandler: (data) => undefined,
  logout: () => undefined,
  isLoggedIn: undefined,
})

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  const queryClient = useQueryClient()

  async function loginHandler(data: UserResponse) {
    localStorage.setItem("token", data.data.token ?? "")
    localStorage.setItem("user_id", data.data.id.toString() ?? "")
    setIsLoggedIn(true)
    queryClient.invalidateQueries()
  }

  function registerHandler(data: UserResponse) {
    localStorage.setItem("token", data.data.token ?? "")
    setIsLoggedIn(true)
    queryClient.invalidateQueries()
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    setIsLoggedIn(false)
    queryClient.invalidateQueries()
  }

  function getToken() {
    return localStorage.getItem("token")
  }

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        registerHandler,
        logout,
        loginHandler,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
