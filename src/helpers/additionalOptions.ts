enum Additionally {
  additionalKeyName = 'additionalOptions'
}

interface AditionalOptions {
	checkbox: boolean
}

type DataObject = {
	[key: string]: number | string | AditionalOptions
}

const addAditionalOptions = (dataObject: DataObject[]) => {
	const copyData = structuredClone(dataObject)

	for (const obj of copyData) {
		obj[Additionally.additionalKeyName] = {
			checkbox: false
		}
	}

	return copyData
}

export { addAditionalOptions, Additionally, DataObject, AditionalOptions } 