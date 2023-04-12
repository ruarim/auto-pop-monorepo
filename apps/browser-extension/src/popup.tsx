import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Search from "~src/hooks/search"

import App from "./components/app"
import useCookie from "./hooks/useCookie"

const queryClient = new QueryClient()

function IndexPopup() {
  //const cookie = useCookie("access_token")

  //console.log(cookie)

  ;(async () => {
    const cookies = await chrome.cookies.getAll({ name: "access_token" })
    console.log(cookies)
  })()

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

export default IndexPopup
