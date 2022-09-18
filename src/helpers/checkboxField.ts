import { sortCheckedRows } from ".."
import { Additionally, DataObject } from "./additionalOptions"

const appendSpecialRowField = (content: string) => {
  const checkbox = document.createElement('input') as HTMLInputElement
  const text = document.createElement('div') as HTMLDivElement

  checkbox.setAttribute('type', 'checkbox')

  text.textContent = content

  return { text, checkbox }
}

// change checkbox value and save new data to localStorage
const changeCheckboxValue = (isChecked: boolean, dataObject: DataObject) => {
  const newData = JSON.parse(localStorage.getItem('original_data') as string)

  for (const obj of newData) {
    if (JSON.stringify(obj) === JSON.stringify(dataObject)) {
      obj[Additionally.additionalKeyName] = {
        checkbox: isChecked
      }
    }
  }
  
  localStorage.setItem('original_data', JSON.stringify(newData))

  sortCheckedRows()
}

const addClickEventToElement = (input: HTMLInputElement, dataObject: DataObject) => {
  input.addEventListener('click', () => {
    changeCheckboxValue(input.checked, dataObject);
  })
}


export { appendSpecialRowField, addClickEventToElement }

