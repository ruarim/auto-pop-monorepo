import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ all: "initial" }}>
      <div className={`fixed bottom-7 right-0 z-50 p-6 font-sans`}>
        <div className="shadow-lg rounded-md p-5 space-y-2 bg-black text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
