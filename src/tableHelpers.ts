import '../style/table.css'

const createStringArrayHeaders = (objectsArray: object[]) => {
  const uniqueKeys: string[] = []

  for (const obj of objectsArray) {
    for (const key in obj) {
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

    for (const key in obj) {
      const th = document.createElement('th');
      th.textContent = obj[key as keyof typeof obj]
      tableRow.appendChild(th);
    }

    mainTable.appendChild(tableRow);
  }

  return mainTable
}