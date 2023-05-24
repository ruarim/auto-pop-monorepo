import client from "~src/axios/depopClient"

export type Product = {
  id: number
  slug: string
  pictures: {
    id: number
    width: number
    height: number
    url: string
  }[][]
  price: {
    priceAmount: string
    currencyName: string
    nationalShippingCost: string
    internationalShippingCost?: string
  }
}

export type ProductsResponse = {
  meta: {
    limit: number
    last_offset_id: string
    end: boolean
  }
  products: Product[]
}

const getShopPaginated = async (
  shopId: string,
  offsetId: string,
  products: Product[],
) => {
  const res = await client.get(
    `/v1/shop/${shopId}/products/?limit=1000&offset_id=${offsetId}`,
  )
  const data = res.data as ProductsResponse

  data.products.map((product) => products.push(product))

  if (!data.meta.end)
    return getShopPaginated(shopId, data.meta.last_offset_id, products)
  else return products
}
const useGetShopProducts = async (shopId: string) => {
  let offsetId = ""
  const products = await getShopPaginated(shopId, offsetId, [])
  return products
}

export default useGetShopProducts
