export const getCookie = (cookieName: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName)) //give diff name to global
    ?.split("=")[1]
}
