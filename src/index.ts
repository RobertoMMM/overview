import { FetchingData } from "../services/api";
import { addAditionalOptions, DataObject } from "./helpers/additionalOptions";
import { createUITable } from "./helpers/creatingTable";

const findButton = document.getElementById('find') as HTMLButtonElement
const inputSearch = document.getElementById('search_field') as HTMLInputElement
const tableSection = document.getElementById('table_section') as HTMLTableSectionElement

const replaceTable = (parent: HTMLElement, newTable: HTMLTableElement) => {
	// removing all children from parent
	parent.textContent = ''

	parent.appendChild(newTable)
}

export const sortCheckedRows = () => {
	const newData = JSON.parse(localStorage.getItem('original_data') as string)

	newData.sort((a: any, b: any) => a.additionalOptions.checkbox - b.additionalOptions.checkbox)

	replaceTable(tableSection, createUITable(newData))

	localStorage.setItem('original_data', JSON.stringify(newData))
}

const getOrSetData = async () => {
	if (!localStorage.getItem('original_data')) {
		const newData = addAditionalOptions(await FetchingData.get('http://localhost:3001/name'))
		const stringyfiedData = JSON.stringify(newData)

		localStorage.setItem('original_data', stringyfiedData);
	}

	return JSON.parse(localStorage.getItem('original_data') as string)
}

const createTableFromData = async () => {
	const response: DataObject[] = await getOrSetData()

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
