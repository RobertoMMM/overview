import '../../style/table.css'
import { Additionally, AditionalOptions, DataObject } from './additionalOptions'
import { addClickEventToElement, appendSpecialRowField } from './checkboxField'

const createStringArrayHeaders = (objectsArray: object[]) => {
  const uniqueKeys: string[] = []

  for (const obj of objectsArray) {
    for (const key in obj) {
      if (key === Additionally.additionalKeyName) break
      if (!uniqueKeys.includes(key)) uniqueKeys.push(key)
    }
  }

  return uniqueKeys
}

const createHeadersTableRow = (headersArray: string[]) => {
  const headersRow = document.createElement('tr') as HTMLHeadElement

  for (const headers of headersArray) {
    const header = document.createElement('td') as HTMLHeadElement
    const select = document.createElement('select') as HTMLSelectElement
    const option = document.createElement('option') as HTMLOptionElement

    option.textContent = headers

    select.appendChild(option)
    header.appendChild(select);
    headersRow.appendChild(header);
  }

  return headersRow
}

export const createUITable = (dataObject: object[]) => {
  const mainTable = document.createElement('table') as HTMLTableElement
  mainTable.classList.add('table')

  const headersStringArray = createStringArrayHeaders(dataObject)
  const tableHeadersRow = createHeadersTableRow(headersStringArray)

  mainTable.appendChild(tableHeadersRow);

  for (const obj of dataObject) {
    const tableRow = document.createElement('tr') as HTMLTableRowElement
    tableRow.setAttribute('draggable', "true")
    tableRow.setAttribute('id', `${Math.random()}`)

    for (const key in obj as DataObject) {
      if (key === Additionally.additionalKeyName) break;
      const th = document.createElement('th');

      if (key === 'name') {
        const { text: content, checkbox } = appendSpecialRowField(obj[key as keyof typeof obj])

        addClickEventToElement(checkbox, obj as DataObject)

        checkbox.checked = (((obj as DataObject).additionalOptions as AditionalOptions).checkbox)

        th.appendChild(content)
        th.appendChild(checkbox)
      } else {
        th.textContent = obj[key as keyof typeof obj]
      }
      tableRow.appendChild(th);
    }

    mainTable.appendChild(tableRow);
  }

  return mainTable
}
