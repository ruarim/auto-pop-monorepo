import { XMarkIcon } from "@heroicons/react/20/solid"
import { useQueryClient } from "@tanstack/react-query"
import { getShopProducts } from "depop-utils"
import { useState } from "react"

import { useAuthContext } from "~src/hooks/context/useAuthContext"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useSetRefreshSchedule from "~src/hooks/mutations/useScheduleRefresh"
import useUser from "~src/hooks/queries/useUser"

import Button from "./button"
import ProgressBar from "./progressBar"

type WidgetProps = {
  setOpen: (isOpen: boolean) => void
  depopId: number
  depopToken: string
}

const Widget = ({ setOpen, depopId, depopToken }: WidgetProps) => {
  const isSelected = (selected: number, schedule: number) => {
    return selected == schedule ? true : false
  }
  const queryClient = useQueryClient()
  const { logout } = useAuthContext()
  const { mutateAsync: refresh } = useRefresh()
  const { mutateAsync: setRefreshSchedule } = useSetRefreshSchedule()
  const [isRefreshing, setRefreshing] = useState(false)
  const [refreshProgress, setRefreshProgress] = useState(0)
  const [numProducts, setNumProducts] = useState(0)
  const { data: userData } = useUser()
  const user = userData?.data

  const handleSchedule = async (schedule: number) => {
    if (isSelected(schedule, user.refreshSchedule)) schedule = 0
    await setRefreshSchedule({ schedule })
    queryClient.invalidateQueries(["user"])
  }

  const handleRefresh = async () => {
    if (!depopId) return alert("Login to use Auto-Hustler")

    setRefreshing(true)
    try {
      await refreshAllProducts(depopId, depopToken)
    } catch (e) {
      console.log(e)
    }
    setRefreshing(false)
    setRefreshProgress(0)
  }

  const refreshAllProducts = async (depopId: number, depopToken: string) => {
    const products = (await getShopProducts(depopId)).flat()
    setNumProducts(products.length)
    for (const product of products) {
      try {
        setRefreshProgress((prevState) => prevState + 1)
        await refresh({
          slug: product.slug,
          accessToken: depopToken,
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  const scheduleOptions = [
    { content: "6hrs", interval: 6 },
    { content: "12hrs", interval: 12 },
    { content: "24hrs", interval: 24 },
  ]

  return (
    <div className="space-y-2">
      <div className="flex justify-between h-full">
        <h1 className="font-bold text-2xl">[A-H]</h1>
        <button
          className="hover:underline text-center w-7"
          onClick={() => setOpen(false)}>
          <XMarkIcon />
        </button>
      </div>

      {isRefreshing && (
        <ProgressBar currentProgress={refreshProgress} max={numProducts} />
      )}

      <Button onClick={handleRefresh}>Refresh All</Button>

      <div>
        <h2 className="text-center w-full py-1">Schedule All</h2>
        <div className="space-y-2">
          {scheduleOptions.map((option, i) => (
            <Button
              key={i}
              isSelected={isSelected(user.refreshSchedule, option.interval)}
              onClick={() => handleSchedule(option.interval)}>
              {option.content}
            </Button>
          ))}
        </div>
      </div>

      <button
        className="hover:underline w-full text-center pt-2"
        onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}

export default Widget
