import { tableSection } from '..'
import { createMetrics, Metrics } from '../../services/configMetrics'
import '../../style/table.css'
import { Additionally, AditionalOptions, DataObject } from './additionalOptions'
import { addClickEventToElement, appendCheckboxWithText, sortCheckedRows } from './checkboxField'

const replaceTable = (parent: HTMLElement, newTable: HTMLTableElement) => {
  // removing all children from parent
  parent.textContent = ''

  parent.appendChild(newTable)
}

const createHeadersTableRow = (metrics: Metrics) => {
  const headersRow = document.createElement('tr') as HTMLHeadElement

  const headersArray = metrics.fields

  for (const headers of headersArray) {
    const header = document.createElement('td') as HTMLHeadElement
    const select = document.createElement('select') as HTMLSelectElement
    const headerText = document.createElement('div') as HTMLDivElement
    const option = document.createElement('option') as HTMLOptionElement

    option.textContent = 'ASC sort'

    select.addEventListener('click', (e) => {
      e.target?.addEventListener('click', () => {
        replaceTable(tableSection, createUITable(metrics.defaultSorting(headers)))
      })
    })

    headerText.textContent = headers

    select.appendChild(option);
    header.appendChild(headerText);
    header.appendChild(select);
    headersRow.appendChild(header);
  }

  return headersRow
}

const createRowsForTable = (obj: DataObject) => {
  const tableRow = document.createElement('tr') as HTMLTableRowElement
  tableRow.setAttribute('draggable', "true")
  tableRow.setAttribute('id', `${Math.random()}`)

  for (const key in obj) {
    if (key === Additionally.additionalKeyName) break;
    const th = document.createElement('th');

    if (key === 'name') {
      const { text: content, checkbox } = appendCheckboxWithText((obj[key as keyof typeof obj]).toString())

      addClickEventToElement(checkbox, obj as DataObject)
      sortCheckedRows()

      checkbox.checked = (((obj as DataObject).additionalOptions as AditionalOptions).checkbox)

      th.appendChild(content)
      th.appendChild(checkbox)
    } else {
      th.textContent = (obj[key as keyof typeof obj]).toString()
    }
    tableRow.appendChild(th);
  }

  return tableRow
}

const createUITable = (dataObject: DataObject[]) => {
  const mainTable = document.createElement('table') as HTMLTableElement
  mainTable.classList.add('table')

  const dataMetrics = createMetrics('name', dataObject)

  const tableHeadersRow = createHeadersTableRow(dataMetrics)

  mainTable.appendChild(tableHeadersRow);

  for (const obj of dataObject) {
    mainTable.appendChild(createRowsForTable(obj as DataObject))
  }

  return mainTable
}

export { createUITable, replaceTable }