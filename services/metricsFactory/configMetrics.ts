import { createStringArrayHeaders } from "../../src/creatingTable/rows";
import { ObjectData } from "../types";

interface SortingsOptions {
  sortAscending: (fieldName: string, data: ObjectData[]) => ObjectData[];
  sortDescending: (fieldName: string, data: ObjectData[]) => ObjectData[];
}

interface MetricsArchitecture {
  defaultMetric: string;
  defaultLimit: number;
  defaultSorting: SortingsOptions;
  fields: string[];
}

type OrderSorting = "asc" | "desc";

const sortData = (
  sortingKey: string,
  dataObject: ObjectData[],
  order: OrderSorting
) => {
  return dataObject.sort((a: ObjectData, b: ObjectData): any => {
    const dataA =
      typeof a[sortingKey] === "string"
        ? (a[sortingKey] as string).toUpperCase()
        : a[sortingKey];
    const dataB =
      typeof b[sortingKey] === "string"
        ? (b[sortingKey] as string).toUpperCase()
        : b[sortingKey];

    let comparison = dataA > dataB ? 1 : -1;

    return order === "asc" ? comparison : comparison * -1;
  });
};

const createMetrics = (
  dataName: string,
  dataObject: ObjectData[]
): MetricsArchitecture => {
  const headers = createStringArrayHeaders(dataObject);

  return {
    defaultMetric: dataName,
    defaultLimit: headers.length,
    defaultSorting: {
      sortAscending: (sortingKey: string, dataObject: ObjectData[]) =>
        sortData(sortingKey, dataObject, "asc"),
      sortDescending: (sortingKey: string, dataObject: ObjectData[]) =>
        sortData(sortingKey, dataObject, "desc"),
    },
    fields: headers,
  };
};

export { createMetrics, MetricsArchitecture };
