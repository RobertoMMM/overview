import "../../style/table.css";
import { ObjectData } from "../../services/types";
import { createHeadersTableRow, createRowsForTable } from "./rows";
import { TABLE } from "../enum";

const parent = document.getElementById(TABLE.PARENT) as HTMLElement;

const replaceTable = (newTable: HTMLTableElement) => {
  parent.textContent = "";

  parent.append(newTable);
};

const replaceContentTable = (dataObject: ObjectData[]) => {
  const table = document.getElementById(TABLE.TABLE_ID) as HTMLElement;
  const tableChildrenLength = table.children.length - 1;

  for (let i = 0; i < tableChildrenLength; i++) {
    table.lastElementChild && table.removeChild(table.lastElementChild);
  }

  for (const obj of dataObject) {
    table.appendChild(createRowsForTable(obj as ObjectData));
  }
};

const createUITable = (dataObject: ObjectData[]) => {
  const mainTable = document.createElement("table") as HTMLTableElement;
  mainTable.classList.add("table");
  mainTable.id = TABLE.TABLE_ID;

  const tableHeadersRow = createHeadersTableRow(dataObject);

  mainTable.appendChild(tableHeadersRow);

  for (const obj of dataObject) {
    mainTable.appendChild(createRowsForTable(obj as ObjectData));
  }

  return mainTable;
};

export { createUITable, replaceTable, replaceContentTable };
