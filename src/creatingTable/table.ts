import "../../style/table.css";
import { ObjectData } from "../../services/types";
import { createHeadersTableRow, createRowsForTable } from "./rows";

const replaceTable = (newTable: HTMLTableElement) => {
  const parent = document.getElementById("table_section") as HTMLElement;
  parent.textContent = "";

  parent.append(newTable);
};

const createUITable = (dataObject: ObjectData[]) => {
  const mainTable = document.createElement("table") as HTMLTableElement;
  mainTable.classList.add("table");

  const tableHeadersRow = createHeadersTableRow(dataObject);

  mainTable.appendChild(tableHeadersRow);

  for (const obj of dataObject) {
    mainTable.appendChild(createRowsForTable(obj as ObjectData));
  }

  return mainTable;
};

export { createUITable, replaceTable };
