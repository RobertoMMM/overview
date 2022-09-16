import axios from 'axios'

class Fetch {
	static async get(url: string) {
		return (await axios.get(url)).data;
	}

	static async post(url: string, payload: any) {
		return (await axios.post(url, payload)).data;
	}

	static async put(url: string, payload: any) {
		return (await axios.put(url, payload)).data;
	}

	static async patch(url: string, payload: any) {
		return (await axios.patch(url, payload)).data;
	}

	static async delete(url: string, payload: any) {
		return (await axios.delete(url, payload)).data;
	}
}

// console.log(await Fetch.get('http://localhost:3001/name'))

const getHeaders = (objectsArray: object[]): string[] => {
	const uniqueKeys: string[] = []

	for (const obj of objectsArray) {
		for (const key in obj) {
			if (uniqueKeys.includes(key)) uniqueKeys.push(key)
		}
	}

	return uniqueKeys
}
// const tableSection = document.getElementById('table_section');
// const arr = getHeaders(Fetch.get("http://localhost:3001/name"))
console.log(await Fetch.get("http://localhost:3001/name"))


// const createTable = (headersArray: string[], dataObject: object[]) => {
// 	const chessTable = document.createElement('table') as HTMLTableElement
// 	chessTable.style.height = '200px'
// 	chessTable.style.width = '200px'

// 	const headersArrayLength = headersArray.length - 1
// 	const tableHeading = document.createElement('tr') as HTMLTableRowElement

// 	for (let i = 0; i < headersArrayLength; i++) {
// 		const th = document.createElement('th');

// 		th.textContent = headersArray[i]
// 		tableHeading.appendChild(th);

// 		chessTable.appendChild(tableHeading);
// 	}

// 	for (let i = 0; i < 8; i++) {
// 		const tableRow = document.createElement('tr') as HTMLTableRowElement

// 		for (let j = 0; j < 8; j++) {
// 			const th = document.createElement('th');
// 			th.textContent = 'henlo'
// 			tableRow.appendChild(th);
// 		}

// 		chessTable.appendChild(tableRow);
// 	}

// 	tableSection?.append(chessTable)
// }

