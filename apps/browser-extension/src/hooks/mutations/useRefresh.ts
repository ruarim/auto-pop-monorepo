import { useMutation } from "@tanstack/react-query"

import client from "~src/axios/depopClient"

import type { Product } from "../queries/useGetShopProducts"

type RefreshData = { slug: string; product: Product }

const useRefresh = () => {
  return useMutation<unknown, any, RefreshData>((data) => {
    const product = data.product
    const refreshData = {
      ...product,
      priceAmount: product.price.priceAmount,
      nationalShippingCost: product.price.nationalShippingCost,
      internationalShippingCost: product.price?.internationalShippingCost,
      priceCurrency: product.price.currencyName,
      pictureIds: product.pictures.map((pic) => pic[0].id),
    }

    return client.put(`/v2/products/${data.slug}`, refreshData)
  })
}

export default useRefresh
