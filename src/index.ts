import { FetchingData } from "../services/api";
import { addAditionalOptions, DataObject } from "./helpers/additionalOptions";
import { getDataFromLocalStorage } from "./helpers/localStorage";
import { createUITable, replaceTable } from "./helpers/table";

const findButton = document.getElementById('find') as HTMLButtonElement
const inputSearch = document.getElementById('search_field') as HTMLInputElement
const tableSection = document.getElementById('table_section') as HTMLTableSectionElement
const lookFor10Items = document.getElementById('10itemslook') as HTMLButtonElement
const lookFor100Items = document.getElementById('100itemslook') as HTMLButtonElement

const getOrSetData = async () => {
	if (!localStorage.getItem('original_data')) {
		const newData = addAditionalOptions(await FetchingData.get('http://localhost:3001/name'))
		const stringyfiedData = JSON.stringify(newData)

		localStorage.setItem('original_data', stringyfiedData);
	}

	return getDataFromLocalStorage("original_data")
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

lookFor10Items.addEventListener('click', () => {
	const data = getDataFromLocalStorage('original_data')

	data.splice(10, data.length)

	replaceTable(tableSection, createUITable(data))
})

lookFor100Items.addEventListener('click', () => {
	const data = getDataFromLocalStorage('original_data')

	data.splice(100, data.length)

	replaceTable(tableSection, createUITable(data))

})
export { tableSection }