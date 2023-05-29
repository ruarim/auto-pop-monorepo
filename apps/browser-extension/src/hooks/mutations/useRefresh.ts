import { useMutation } from "@tanstack/react-query"

import delay from "~src/utils/delay"

import { RefreshData, refresh } from "../../../../../packages/depop-utils/src/index"

const useRefresh = () => {
  return useMutation<unknown, any, RefreshData>(async (data) => {
    await delay(500)
    return refresh(data)
  })
}

export default useRefresh
