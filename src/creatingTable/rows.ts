import { sortData } from "../../services/metricsFactory/configMetrics";
import { DataCreationDate } from "../../services/randomDataFactory/dataStructure";
import { ObjectData } from "../../services/types";
import { DATA, TABLE } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { replaceContentTable } from "./table";

const createStringArrayHeaders = (objectsArray: ObjectData[]) => {
  const uniqueKeys: string[] = [];

  for (const obj of objectsArray) {
    for (const key in obj) {
      if (key === DataCreationDate.hidden) break;
      !uniqueKeys.includes(key) && uniqueKeys.push(key);
    }
  }

  return uniqueKeys;
};
3;
const createHeadersTableRow = (dataObject: ObjectData[]) => {
  const headersRow = document.createElement("tr") as HTMLHeadElement;
  headersRow.id = TABLE.BODY_HEADERS_ID;

  const headersArray = createStringArrayHeaders(dataObject);

  for (const headers of headersArray) {
    const header = document.createElement("td") as HTMLHeadElement;
    const headerText = document.createElement("div") as HTMLDivElement;
    const sortingButton = document.createElement("button") as HTMLButtonElement;
    sortingButton.textContent = "<";

    let isAscending = false;

    sortingButton.addEventListener("click", (e) => {
      e.preventDefault();

      const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);
      const currentPageInput = document.getElementById(
        "currentPage"
      ) as HTMLInputElement;
      const pageInputValue = parseInt(currentPageInput.value) || 0;

      isAscending
        ? (sortingButton.textContent = ">")
        : (sortingButton.textContent = "<");
      isAscending = !isAscending;

      const sortedData = isAscending
        ? sortData(headers, formattedData[pageInputValue], "ascending")
        : sortData(headers, formattedData[pageInputValue], "descending");

      replaceContentTable(sortedData);
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

  for (const key in data) {
    if (key === DataCreationDate.hidden) break;
    const th = document.createElement("th");

    th.textContent = data[key as keyof typeof data].toString();

    tableRow.appendChild(th);
  }

  return tableRow;
};

export { createStringArrayHeaders, createRowsForTable, createHeadersTableRow };
