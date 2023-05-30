export const getCookie = (cookieName: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName))
    ?.split("=")[1]
}
