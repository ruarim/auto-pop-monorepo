import client from "~src/axios/client"

const useGetProduct = (slug: string) => {
  return client.get(`/v2/products/${slug}`)
}

export default useGetProduct
