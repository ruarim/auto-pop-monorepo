import { XMarkIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"

import { ACCESS_COOKIE_NAME, USER_COOKIE_NAME } from "~globals"
import { useAuthContext } from "~src/hooks/context/useAuthContext"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useSetDepopToken from "~src/hooks/mutations/useSetDepopToken"
import useGetProduct from "~src/hooks/queries/useGetProduct"
import useGetShopProducts from "~src/hooks/queries/useGetShopProducts"
import useUser from "~src/hooks/queries/useUser"
import delay from "~src/utils/delay"
import { getCookie } from "~src/utils/getCookie"

import Button from "./button"
import Progress from "./progress"
import RegisterLogin from "./registerLogin"

const App = () => {
  const [isRefreshing, setRefreshing] = useState(false)
  const [isOpen, setOpen] = useState(true)
  const [selected, setSelected] = useState<number>()
  const [refreshProgress, setRefreshProgress] = useState(0)
  const [numProducts, setNumProducts] = useState(0)
  const user_id = getCookie(USER_COOKIE_NAME)
  const depopToken = getCookie(ACCESS_COOKIE_NAME)
  const { mutateAsync: refresh } = useRefresh()
  const { data: user, isLoading: userLoading } = useUser()
  const { mutateAsync: setDepopToken } = useSetDepopToken()
  const { logout, isLoggedIn } = useAuthContext()

  //from backend?
  const scheduleOptions = [
    { content: "6hrs", interval: 6 },
    { content: "12hrs", interval: 12 },
    { content: "24hrs", interval: 24 },
  ]

  useEffect(() => {
    if (user) setDepopToken({ token: depopToken })
  }, [user, depopToken])

  const isSelected = (selected: number, schedule: number) => {
    return selected == schedule ? true : false
  }

  const handleRefresh = async () => {
    if (!user_id) return alert("Login to use Auto-Hustler") //use custom modal

    setRefreshing(true)
    try {
      const products = (await useGetShopProducts(user_id)).flat()
      setNumProducts(products.length)
      for (const product of products) {
        try {
          setRefreshProgress((prevState) => prevState + 1)
          const productData = await useGetProduct(product.slug)
          await refresh({ slug: product.slug, product: productData.data })
          await delay(500)
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

  const handleSchedule = (schedule: number) => {
    //this should post to schedule endpoint for current user_id
    //replace setSeleced with mutateSchedule calling api
    if (isSelected(selected, schedule)) setSelected(undefined)
    else setSelected(schedule)
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

  if (isOpen && isLoggedIn)
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
                  isSelected={isSelected(selected, option.interval)}
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
