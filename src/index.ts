import { FetchingData } from "../services/api";
import { createUITable } from "./tableHelpers";

const findButton = document.getElementById('find') as HTMLButtonElement
const inputSearch = document.getElementById('search_field') as HTMLInputElement
const tableSection = document.getElementById('table_section') as HTMLTableSectionElement

const replaceTable = (parent: HTMLElement, newTable: HTMLTableElement) => {
	parent.textContent = ''

	parent.appendChild(newTable)
}

const getOrSetData = async () => {
	if (!localStorage.getItem('original_data')) {
		const fetchedData = JSON.stringify(await FetchingData.get('http://localhost:3001/name'))

		localStorage.setItem('original_data', fetchedData);
	}

	return JSON.parse(localStorage.getItem('original_data') as string)
}

const createTableFromData = async () => {
	const response: object[] = await getOrSetData()

	replaceTable(tableSection, createUITable(response))
}

createTableFromData()


const filterTableByInput = async (searchString: string) => {
	if (!searchString.length) {
		return replaceTable(tableSection, createUITable(await getOrSetData()))
	}

	const newData = (await getOrSetData()).filter((obj: object) => {
		for (const key in obj) {
			if (obj[key as keyof typeof obj] === searchString) return obj
		}
	})

	newData.length && replaceTable(tableSection, createUITable(newData))
}

findButton.addEventListener('click', () => {
	filterTableByInput(inputSearch.value)

	inputSearch.value
})
