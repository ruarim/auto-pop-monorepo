import type { ReactNode } from "react"
import { useForm } from "react-hook-form"

import { useAuthContext } from "~src/hooks/context/useAuthContext"
import { LoginData, useLogin } from "~src/hooks/mutations/useLogin"
import useRegister from "~src/hooks/mutations/useRegister"

const RegisterLogin = () => {
  const { mutateAsync: registerUser } = useRegister()
  const { mutateAsync: loginUser } = useLogin()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginData>()

  const { registerHandler, loginHandler } = useAuthContext()

  const handleRegister = async (data: LoginData) => {
    console.log(data)

    registerUser(data)
      .then((res) => registerHandler && registerHandler(res))
      .catch((e) => {
        //check error code 409
        //if()
        setError("password", {
          type: "server",
          message: e.response.data.message,
        })
      })
  }
  const handleLogin = async (data: LoginData) => {
    loginUser(data)
      .then((res) => loginHandler && loginHandler(res))
      .catch(() => {
        setError("password", {
          type: "server",
          message: "Login failed, check your password.",
        })
      })
  }

  const inputStyle =
    "block w-full appearance-none rounded-lg border border-gray-300 p-3 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black bg-gray-100 text-black"

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-14 py-2">
        <div>
          {/* logo here */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
            Create an account
          </h2>
        </div>

        <div className="my-4">
          <div className="px-4 space-y-6">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-100">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={inputStyle}
                  />
                </div>
                <div className="text-red-600 mt-2">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
            </form>
            <div className="flex space-x-2 justify-between">
              <Button onClick={handleSubmit(handleLogin)}>Login</Button>
              <Button onClick={handleSubmit(handleRegister)}>Register</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-border-gray-300 border text-gray-100 flex w-full justify-center rounded-full p-3 text-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
      {children}
    </button>
  )
}

export default RegisterLogin
