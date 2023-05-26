import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { ACCESS_COOKIE_NAME, USER_COOKIE_NAME } from "~globals"
import { useAuthContext } from "~src/hooks/context/useAuthContext"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useSetRefreshSchedule from "~src/hooks/mutations/useScheduleRefresh"
import useSetDepopUser from "~src/hooks/mutations/useSetDepopUser"
import useUser from "~src/hooks/queries/useUser"
import { getCookie } from "~src/utils/getCookie"

import RegisterLogin from "./registerLogin"
import Widget from "./widget"

const App = () => {
  const [isOpen, setOpen] = useState(true)

  const depopId = Number(getCookie(USER_COOKIE_NAME))
  const depopToken = getCookie(ACCESS_COOKIE_NAME)

  const { data: userData, isLoading: userLoading } = useUser()
  const { mutateAsync: setDepopUser } = useSetDepopUser()
  const { isLoggedIn } = useAuthContext()

  const user = userData?.data

  useEffect(() => {
    if (user) setDepopUser({ depopToken, depopId })
  }, [user, depopToken, depopId])

  const defaultWidth = "w-[120px]"
  const loginWidth = "w-[400px]"

  if (!isLoggedIn && !userLoading)
    return (
      <div className={loginWidth}>
        <RegisterLogin />
      </div>
    )

  if (!isOpen)
    return (
      <button className={defaultWidth} onClick={() => setOpen(true)}>
        <Logo />
      </button>
    )

  if (isOpen && isLoggedIn && user)
    //animate open
    return (
      <div className={defaultWidth}>
        <Widget
          setOpen={setOpen}
          depopId={depopId}
          depopToken={depopToken}
          user={user}
        />
      </div>
    )
}

const Logo = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="rounded-md text-white bg-black">
        <h1 className="font-bold text-2xl">[A-H]</h1>
      </div>
    </div>
  )
}

export default App
