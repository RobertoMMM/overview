import { sortData } from "../../services/metricsFactory/configMetrics";
import { DataCreationDate } from "../../services/randomDataFactory/structuredData";
import { ObjectData } from "../../services/types";
import { Table } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { createUITable, replaceTable } from "./table";

const createStringArrayHeaders = (objectsArray: ObjectData[]) => {
  const uniqueKeys: string[] = [];

  for (const obj of objectsArray) {
    for (const key in obj) {
      if (key === DataCreationDate.hidden) break;
      if (!uniqueKeys.includes(key)) uniqueKeys.push(key);
    }
  }

  return uniqueKeys;
};

const createHeadersTableRow = (dataObject: ObjectData[]) => {
  const headersRow = document.createElement("tr") as HTMLHeadElement;

  const headersArray = createStringArrayHeaders(dataObject);

  for (const headers of headersArray) {
    const header = document.createElement("td") as HTMLHeadElement;
    const headerText = document.createElement("div") as HTMLDivElement;
    const sortingButton = document.createElement("button") as HTMLButtonElement;
    sortingButton.textContent = "<";

    sortingButton.addEventListener("click", (e) => {
      e.preventDefault();

      const formattedData = LocalStorage.get(Table.paginationData);
      const currentPageInput = document.getElementById(
        "currentPage"
      ) as HTMLInputElement;
      const pageInputValue = parseInt(currentPageInput.value) || 0;

      const sortedData = sortData(
        headers,
        formattedData[pageInputValue],
        "ascending"
      );

      replaceTable(createUITable(sortedData));
    });

    headerText.textContent = headers;

    header.appendChild(headerText);
    header.appendChild(sortingButton);
    headersRow.appendChild(header);
  }

  return headersRow;
};

const createRowsForTable = (data: ObjectData) => {
  const tableRow = document.createElement("tr") as HTMLTableRowElement;
  tableRow.setAttribute("id", `${Math.random()}`);

  for (const key in data) {
    if (key === DataCreationDate.hidden) break;
    const th = document.createElement("th");

    th.textContent = data[key as keyof typeof data].toString();

    tableRow.appendChild(th);
  }

  return tableRow;
};

export { createStringArrayHeaders, createRowsForTable, createHeadersTableRow };
