import { XMarkIcon } from "@heroicons/react/20/solid"
import { getShopProducts } from "depop-utils"
import { useState } from "react"

import useRefresh from "~src/hooks/mutations/useRefresh"

import Button from "./button"
import ProgressBar from "./progressBar"

type WidgetProps = {
  setOpen: (isOpen: boolean) => void
  depopId: number
  depopToken: string
}

const RefreshProducts = ({ setOpen, depopId, depopToken }: WidgetProps) => {
  const { mutateAsync: refresh } = useRefresh()
  const [isRefreshing, setRefreshing] = useState(false)
  const [refreshProgress, setRefreshProgress] = useState(0)
  const [numProducts, setNumProducts] = useState(0)

  const handleRefresh = async () => {
    if (!depopId) return alert("Login to use Auto-Pop")

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
    try {
      const products = (await getShopProducts(depopId)).flat()
      setNumProducts(products.length)
      for (const product of products) {
        setRefreshProgress((prevState) => prevState + 1)
        if (product.sold) continue
        await refresh({
          slug: product.slug,
          accessToken: depopToken,
        })
      }
    } catch (e) {
      console.log(`Error refreshing products: ${e.message}`)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between h-full">
        <h1 className="font-bold text-2xl">[A-P]</h1>
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
    </div>
  )
}

export default RefreshProducts
