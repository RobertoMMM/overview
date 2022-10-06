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

const getSortedData = (
  sortingKey: string,
  method: "ascending" | "descending"
) => {
  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);
  const currentPageInput = document.getElementById(
    "currentPage"
  ) as HTMLInputElement;
  const pageInputValue = parseInt(currentPageInput.value) || 0;

  const sortedData =
    method === "ascending"
      ? sortData(sortingKey, formattedData[pageInputValue], "ascending")
      : sortData(sortingKey, formattedData[pageInputValue], "descending");

  return sortedData;
};

const createHeadersTableRow = (dataObject: ObjectData[]) => {
  const headersRow = document.createElement("tr") as HTMLHeadElement;
  headersRow.id = TABLE.HEADER_ROW_ID;

  const headersArray = createStringArrayHeaders(dataObject);

  for (const headers of headersArray) {
    const header = document.createElement("td") as HTMLHeadElement;
    const headerText = document.createElement("div") as HTMLDivElement;
    const sortingButton = document.createElement("button") as HTMLButtonElement;

    sortingButton.textContent = "<";
    sortingButton.className = TABLE.SORTING_BUTTON_CLASS;

    let isAscending = true;

    headerText.addEventListener("click", () => {
      const rowFields = headersRow.getElementsByTagName("td");

      for (let i = 0; i < headersArray.length; i++) {
        const button = rowFields[i].getElementsByTagName("button")[0] as HTMLButtonElement;

        button && button.classList.remove("show");
      }

      const sortedData = getSortedData(headers, "ascending");
      replaceContentTable(sortedData);

      header.appendChild(sortingButton);
      sortingButton.classList.add("show");
    });

    sortingButton.addEventListener("click", (e) => {
      e.preventDefault();

      isAscending
        ? (sortingButton.textContent = ">")
        : (sortingButton.textContent = "<");

      const sortingMethod = isAscending ? "descending" : "ascending";

      isAscending = !isAscending;

      const sortedData = getSortedData(headers, sortingMethod);
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
