export {}
;(async () => {
  const cookies = await chrome.cookies.getAll({ name: "access_token" })
  console.log(cookies)
})()
