import { createStringArrayHeaders } from "../../src/creatingTable/rows";
import { ObjectData } from "../types";
interface MetricsArchitecture {
  defaultMetric: string;
  defaultLimit: number;
  fields: string[];
}

type OrderSorting = "ascending" | "descending";

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

    return order === "ascending" ? comparison : comparison * -1;
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
    fields: headers,
  };
};

export { createMetrics, MetricsArchitecture, sortData, OrderSorting };
