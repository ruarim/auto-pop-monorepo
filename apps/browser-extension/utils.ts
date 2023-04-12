export async function setBearer() {
  let bearer = await getCookie("access_token")
  //save in local storage
  chrome.storage.sync.set({ bearer })
}

export function getBearer() {
  let bearer: string
  chrome.storage.sync.get(["bearer"], function (result) {
    bearer = result.bearer
    //return instead and directlly assign to bearer
  })
  return bearer
}

export async function setUserId() {
  let userId = await getCookie("user_id")
  //save in local storage
  chrome.storage.sync.set({ userId })
}

export function getUserId() {
  let userId: string
  chrome.storage.sync.get(["user_id"], function (result) {
    userId = result.user_id
    //return instead and directlly assign to bearer
  })
  return userId
}

//user_id
//access_token
async function getCookie(type: string) {
  //get depop bearer from logged in user
  const cookies = await chrome.cookies.getAll({ name: type })
  return cookies[0].value
}
