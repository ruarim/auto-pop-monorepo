import { useState } from "react"

import { ACCESS_COOKIE_NAME, USER_COOKIE_NAME } from "~globals"
import { getCookie } from "~src/utils/getCookie"
import RefreshProducts from "./refreshProducts"
import Logo from "./logo"

const App = () => {
  const [isOpen, setOpen] = useState(true)

  const depopId = Number(getCookie(USER_COOKIE_NAME))
  const depopToken = getCookie(ACCESS_COOKIE_NAME)

  const widgetWidth = "w-[120px]"

  if (!isOpen)
    return (
      <button className={widgetWidth} onClick={() => setOpen(true)}>
        <Logo />
      </button>
    )

  if (isOpen)
    return (
      <div className={widgetWidth}>
        <RefreshProducts
          setOpen={setOpen}
          depopId={depopId}
          depopToken={depopToken}
        />
      </div>
    )
}

export default App
