import { DataCreationDate } from "../../services/randomDataFactory/structuredData";
import { ObjectData } from "../../services/types";

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
    const select = document.createElement("select") as HTMLSelectElement;
    const headerText = document.createElement("div") as HTMLDivElement;
    const option = document.createElement("option") as HTMLOptionElement;

    option.textContent = "ASC sort";

    // select.addEventListener("click", (e) => {
    //   e.target?.addEventListener("click", () => {
    //     replaceTable(
    //       tableSection,
    //       createUITable(metrics.defaultSorting(headers))
    //     );
    //   });
    // });

    headerText.textContent = headers;

    select.appendChild(option);
    header.appendChild(headerText);
    header.appendChild(select);
    headersRow.appendChild(header);
  }

  return headersRow;
};

const createRowsForTable = (obj: ObjectData) => {
  const tableRow = document.createElement("tr") as HTMLTableRowElement;
  tableRow.setAttribute("draggable", "true");
  tableRow.setAttribute("id", `${Math.random()}`);

  for (const key in obj) {
    if (key === DataCreationDate.hidden) break;
    const th = document.createElement("th");

    th.textContent = obj[key as keyof typeof obj].toString();

    tableRow.appendChild(th);
  }

  return tableRow;
};

export { createStringArrayHeaders, createRowsForTable, createHeadersTableRow };
