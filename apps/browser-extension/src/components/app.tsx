import { XMarkIcon } from "@heroicons/react/20/solid"
import { useQueryClient } from "@tanstack/react-query"
import { getProduct, getShopProducts } from "depop-utils"
import { useEffect, useState } from "react"

import { ACCESS_COOKIE_NAME, USER_COOKIE_NAME } from "~globals"
import { useAuthContext } from "~src/hooks/context/useAuthContext"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useSetRefreshSchedule from "~src/hooks/mutations/useScheduleRefresh"
import useSetDepopUser from "~src/hooks/mutations/useSetDepopUser"
import useUser from "~src/hooks/queries/useUser"
import { getCookie } from "~src/utils/getCookie"

import Button from "./button"
import Progress from "./progress"
import RegisterLogin from "./registerLogin"

const App = () => {
  const queryClient = useQueryClient()
  const [isRefreshing, setRefreshing] = useState(false)
  const [isOpen, setOpen] = useState(true)
  const [refreshProgress, setRefreshProgress] = useState(0)
  const [numProducts, setNumProducts] = useState(0)
  const depopId = Number(getCookie(USER_COOKIE_NAME))
  const depopToken = getCookie(ACCESS_COOKIE_NAME)
  const { mutateAsync: refresh } = useRefresh()
  const { data: userData } = useUser()
  const { mutateAsync: setDepopUser } = useSetDepopUser()
  const { logout, isLoggedIn } = useAuthContext()
  const { mutateAsync: setRefreshSchedule } = useSetRefreshSchedule()

  const user = userData?.data

  //from backend?
  const scheduleOptions = [
    { content: "6hrs", interval: 6 },
    { content: "12hrs", interval: 12 },
    { content: "24hrs", interval: 24 },
  ]

  useEffect(() => {
    if (user) setDepopUser({ depopToken, depopId })
  }, [user, depopToken, depopId])

  const isSelected = (selected: number, schedule: number) => {
    return selected == schedule ? true : false
  }

  const handleRefresh = async () => {
    //create isLogggedInDepop hook
    if (!depopId) return alert("Login to use Auto-Hustler")

    setRefreshing(true)
    try {
      const products = (await getShopProducts(depopId)).flat()
      setNumProducts(products.length)
      for (const product of products) {
        try {
          setRefreshProgress((prevState) => prevState + 1)
          const productData = await getProduct(product.slug, depopToken)
          await refresh({
            slug: product.slug,
            product: productData.data,
            accessToken: depopToken,
          })
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e)
    }
    setRefreshing(false)
    setRefreshProgress(0)
  }

  const handleSchedule = async (schedule: number) => {
    await setRefreshSchedule({ schedule })
    queryClient.invalidateQueries(["user"])
  }

  const defaultWidth = "w-[120px]"
  const loginWidth = "w-[400px]"

  if (!isLoggedIn)
    return (
      <div className={loginWidth}>
        <RegisterLogin />
      </div>
    )

  if (!isOpen)
    return (
      <button className={defaultWidth} onClick={() => setOpen(true)}>
        <div className="flex justify-center w-full h-full">
          <div className="rounded-md text-white bg-black">
            <h1 className="font-bold text-2xl">[A-H]</h1>
          </div>
        </div>
      </button>
    )

  if (isOpen && isLoggedIn && user)
    //animate transition on open with headless or radix
    return (
      <div className={defaultWidth}>
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
            <h2 className="text-center w-full ">Schedule</h2>
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
      </div>
    )
}

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

export default App
