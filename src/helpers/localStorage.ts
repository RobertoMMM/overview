export const getDataFromLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) as string)
}