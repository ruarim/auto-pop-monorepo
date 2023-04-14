import { useEffect, useState } from "react"

import { USER_COOKIE_NAME } from "~globals"
import useRefresh from "~src/hooks/mutations/useRefresh"
import useGetProduct from "~src/hooks/queries/useGetProduct"
import useGetShopProducts from "~src/hooks/queries/useGetShopProducts"
import { getCookie } from "~src/utils/getCookie"

import Button from "./button"
import { Progress } from "./progress"

type Schedule = 6 | 12 | 24 | undefined

const App = () => {
  const [isRefreshing, setRefreshing] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<Schedule>()
  const [refreshProgress, setRefreshProgress] = useState(0)

  const user_id = getCookie(USER_COOKIE_NAME)
  const { mutateAsync: refresh } = useRefresh()

  //will come from api
  //getUser()
  //user.schedule

  const isSelected = (selected: Schedule, schedule: Schedule) => {
    return selected == schedule ? true : false
  }
  //get currentSchedual

  const handleRefresh = async () => {
    setRefreshing(true)

    try {
      const products = (await useGetShopProducts(user_id)).flat()

      products.map(async (product: Product) => {
        try {
          const productData = await useGetProduct(product.slug)
          await refresh({ slug: product.slug, product: productData.data })
        } catch (e) {
          console.log(e)
        }
      })
    } catch (e) {
      console.log(e)
    }
    setRefreshing(false)
  }
  const handleSchedule = (schedule: Schedule) => {
    //this should post to schedule endpoint for current user_id
    //replace setSeleced with mutateSchedule calling api
    if (isSelected(selected, schedule)) setSelected(undefined)
    else setSelected(schedule)
  }

  if (!isOpen)
    return (
      <div className="fixed bottom-0 right-0 z-50 p-6 font-sans">
        <div
          className="w-38 h-38 rounded-md p-5 text-white bg-black"
          onClick={() => setOpen(true)}>
          <h1 className="font-bold text-2xl">[A-H]</h1>
        </div>
      </div>
    )

  //animate transition on open with headless or radix
  if (isOpen)
    return (
      <div style={{ all: "initial" }}>
        <div className="fixed bottom-0 right-0 z-50 p-6 font-sans">
          <div className="shadow-lg rounded-md p-5 space-y-2 bg-black text-white">
            {isRefreshing && <ProgressBar />}
            {/* use map and array */}
            <Button onClick={handleRefresh} content="Refresh All" />
            <div className="space-y-2">
              <h2 className="text-center w-full ">Schedule</h2>
              <Button
                isSelected={isSelected(selected, 6)}
                onClick={() => handleSchedule(6)}
                content="6hrs"
              />
              <Button
                isSelected={isSelected(selected, 12)}
                onClick={() => handleSchedule(12)}
                content="12Hrs"
              />
              <Button
                isSelected={isSelected(selected, 24)}
                onClick={() => handleSchedule(24)}
                content="24hrs"
              />
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

const ProgressBar = () => {
  //should take from prop
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="text-white space-y-1">
      <h2>Refreshing...</h2>
      <Progress value={progress} className="w-full h-4 " />
    </div>
  )
}

export default App
