import { Additionally } from "../src/helpers/additionalOptions"

type DataObject = {
  [key: string]: any,
}

type Metrics = DataObject & {
  fields: string[],
  defaultSorting: (header: string) => DataObject[]
}

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

// sort arrays of object, that have typeof keys value === string || number 
const sortAscending = (sortingKey: string, dataObject: DataObject[]) => {
  return dataObject.sort((a: any, b: any) => {
    const dataA = (typeof a[sortingKey] === 'string')
      ? a[sortingKey].toUpperCase() : a[sortingKey];
    const dataB = (typeof b[sortingKey] === 'string')
      ? b[sortingKey].toUpperCase() : b[sortingKey];

    return (dataA > dataB) ? 1 : -1
  });
}

const createMetrics = (dataName: string, dataObject: Metrics[]): Metrics => {
  const headers = createStringArrayHeaders(dataObject)

  return {
    defaultMetric: dataName,
    defaultLimit: headers.length,
    defaultSorting: (sortingKey: string) => sortAscending(sortingKey, dataObject),
    fields: headers,
    sortingMethods: {
      // TODO
    }
  }
}

export { createMetrics, createStringArrayHeaders, Metrics, DataObject }

