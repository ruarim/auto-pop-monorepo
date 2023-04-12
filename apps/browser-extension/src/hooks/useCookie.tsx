import { useRef } from "react"

const DOMAIN = "https://depop.com"

const useCookie = (cookieName: string) => {
  const cookie = useRef<string>()

  //set initial value
  chrome.cookies.getAll({ name: cookieName }).then((cookies) => {
    console.log({ cookies })

    cookie.current = cookies.find((cookie) => cookie.domain == DOMAIN).value
  })

  //on change update value
  chrome.cookies.onChanged.addListener((changeInfo) => {
    if (
      changeInfo.cookie.name != cookieName &&
      changeInfo.cookie.domain != DOMAIN
    )
      return

    cookie.current = changeInfo.cookie.value
  })

  return cookie.current
}

export default useCookie
