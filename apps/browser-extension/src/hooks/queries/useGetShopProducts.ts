import client from "~src/axios/client"

const getShopPaginated = async (
  shopId: string,
  offsetId: string,
  products: Product[],
) => {
  const res = await client.get(
    `/v1/shop/${shopId}/products/?limit=1000&offset_id=${offsetId}`,
  )
  const data = res.data
  products.push(data.products)

  if (!data.meta.end) return getShopPaginated(shopId, data.meta.last_offset_id, products)
  else return products
}
const useGetShopProducts = async (shopId: string) => {
  let offsetId = ""
  const products = await getShopPaginated(shopId, offsetId, [])
  return products
}

export default useGetShopProducts
