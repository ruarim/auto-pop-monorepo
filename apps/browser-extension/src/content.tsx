import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import cssText from "data-text:~./src/style.css"
import type { PlasmoContentScript } from "plasmo"

import App from "~src/components/app"

import Layout from "./components/layout"

export const config: PlasmoContentScript = {
  matches: ["https://www.depop.com/*"],
}

const queryClient = new QueryClient()

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <App />
      </Layout>
    </QueryClientProvider>
  )
}

export default PlasmoOverlay
