import * as ProgressPrimitive from "@radix-ui/react-progress"
import clsx from "clsx"
import * as React from "react"

const ProgressBar = ({
  currentProgress,
  max,
}: {
  currentProgress: number
  max: number
}) => {
  const progress = Math.floor((currentProgress / max) * 100)

  return (
    <div className="text-white space-y-1">
      <h2>Refreshing...</h2>
      <Progress value={progress} className="w-full h-4 " />
    </div>
  )
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={clsx(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-700",
      className,
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gray-300 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export default ProgressBar
