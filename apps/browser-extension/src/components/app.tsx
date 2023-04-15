import { useState } from "react"

import { USER_COOKIE_NAME } from "~globals"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useGetProduct from "~src/hooks/queries/useGetProduct"
import useGetShopProducts from "~src/hooks/queries/useGetShopProducts"
import delay from "~src/utils/delay"
import { getCookie } from "~src/utils/getCookie"

import Button from "./button"
import Progress from "./progress"

const App = () => {
  const [isRefreshing, setRefreshing] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<number>()
  const [refreshProgress, setRefreshProgress] = useState(0)
  const [numProducts, setNumProducts] = useState(0)
  const user_id = getCookie(USER_COOKIE_NAME)
  const { mutateAsync: refresh } = useRefresh()

  //get current Schedule
  //will come from api
  //getUser()
  //user.schedule

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

  if (!isOpen)
    return (
      <button className="fixed bottom-0 right-0 z-50 p-6 font-sans">
        <div
          className="w-38 h-38 rounded-md p-5 text-white bg-black"
          onClick={() => setOpen(true)}>
          <h1 className="font-bold text-2xl">[A-H]</h1>
        </div>
      </button>
    )
  const scheduleOptions = [
    { content: "6hrs", interval: 6 },
    { content: "12hrs", interval: 12 },
    { content: "24hrs", interval: 24 },
  ]

  //animate transition on open with headless or radix
  if (isOpen)
    return (
      <div style={{ all: "initial" }}>
        <div className="fixed bottom-0 right-0 z-50 p-6 font-sans">
          <div className="shadow-lg rounded-md p-5 space-y-2 bg-black text-white">
            {isRefreshing && (
              <ProgressBar
                currentProgress={refreshProgress}
                max={numProducts}
              />
            )}
            {/* use map and array */}
            <Button onClick={handleRefresh} content="Refresh All" />
            <div className="space-y-2">
              <h2 className="text-center w-full ">Schedule</h2>
              {scheduleOptions.map((option, i) => (
                <Button
                  key={i}
                  isSelected={isSelected(selected, option.interval)}
                  onClick={() => handleSchedule(option.interval)}
                  content={option.content}
                />
              ))}
            </div>
            <button
              className="hover:underline w-full text-center"
              onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
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
