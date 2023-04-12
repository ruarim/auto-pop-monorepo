import cssText from "data-text:~./src/style.css"
import type { PlasmoContentScript } from "plasmo"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "~src/components/app"

export const config: PlasmoContentScript = {
  matches: ["https://depop.com/*"],
}

const queryClient = new QueryClient()

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  chrome.cookies
    .getAll({ name: "access_token" })
    .then((cookies) => console.log(cookies))

  return (
    <QueryClientProvider client={queryClient}>
      {/* mount app component here */}
      <div className="absolute">TEST</div>
    </QueryClientProvider>
  )
}

export default PlasmoOverlay
