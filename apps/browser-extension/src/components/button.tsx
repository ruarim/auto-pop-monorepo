import clsx from "clsx"

interface ButtonProps {
  onClick?: () => void
  content?: string
  isSelected?: boolean
}
const Button = ({ onClick, content, isSelected }: ButtonProps) => {
  return (
    <CornerBorder>
      <button
        className={clsx(
          "hover:bg-gray-700 w-full p-3 flex justify-center",
          isSelected && "bg-gray-800",
        )}
        onClick={onClick}>
        <p>{content}</p>
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
