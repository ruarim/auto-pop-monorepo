import clsx from "clsx"
import type { ReactNode } from "react"

interface ButtonProps {
  onClick?: () => void
  children?: ReactNode
  isSelected?: boolean
}
const Button = ({ onClick, children, isSelected }: ButtonProps) => {
  return (
    <CornerBorder>
      <button
        className={clsx(
          "hover:bg-gray-600 w-full p-3 flex justify-center transition hover:transition-all",
          isSelected && "bg-gray-700",
        )}
        onClick={onClick}>
        <p>{children}</p>
      </button>
    </CornerBorder>
  )
}

const CornerBorder = ({ children }) => {
  const BorderX = () => {
    return (
      <div className="flex w-full justify-between">
        <div className="border border-white w-1/12" />
        <div className="border border-white w-1/12" />
      </div>
    )
  }
  return (
    <div>
      <BorderX />
      <div className="border-x border-white flex justify-center">
        {children}
      </div>
      <BorderX />
    </div>
  )
}

export default Button
