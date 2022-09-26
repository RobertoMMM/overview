import { MetricsArchitecture } from "../../services/metricsFactory/configMetrics";
import { ObjectData } from "../../services/types";
import "../../style/configurator.css";
import { createUITable, replaceTable } from "../creatingTable/table";
import { Table, TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import {
  getCheckedInputsValue,
  recreateTableConfig,
} from "./config";
import { createButton } from "./configButtons";

const addSpecialClickEvent = (parent: HTMLElement, event: () => void) => {
  parent.addEventListener("click", (e) => {
    e.target?.addEventListener("click", event);
  });
};

const createDragDropChips = (fields: string[]): HTMLUListElement => {
  const chipsList = document.createElement("ul") as HTMLUListElement;

  for (const field of fields) {
    const listItem = document.createElement("li") as HTMLLIElement;
    listItem.setAttribute("draggable", "true");
    const text = document.createElement("div") as HTMLDivElement;

    text.textContent = field;

    listItem.appendChild(text);
    chipsList.appendChild(listItem);
  }

  let draggedTableRow: HTMLElement | null;

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("dragstart", (e: any) => {
    draggedTableRow = e.target;
  });

  const dropTableRow = (event: any) => {
    if (!draggedTableRow) {
      return;
    }
    const targetTableRow = event.target.parentElement;
    const stringDraggedChilds = draggedTableRow.innerHTML;
    const stringTargetChilds = targetTableRow.innerHTML;

    if (
      chipsList.contains(draggedTableRow) &&
      chipsList.contains(targetTableRow)
    ) {
      draggedTableRow.innerHTML = stringTargetChilds;
      targetTableRow.innerHTML = stringDraggedChilds;
    }
  };

  document.addEventListener("drop", (event: any) => {
    dropTableRow(event);
    recreateTableConfig()
  });

  return chipsList;
};

const createSelect = <T>(items: T[]) => {
  const selectPerPage = document.createElement("select") as HTMLSelectElement;

  for (const item of items) {
    const optionItem = document.createElement("option") as HTMLOptionElement;

    optionItem.textContent = `${item}`;
    selectPerPage.appendChild(optionItem);
  }

  addSpecialClickEvent(selectPerPage, () => {
    recreateTableConfig()
  });

  return selectPerPage;
};

const createCheckboxesList = (fields: string[]): HTMLUListElement => {
  const checkList = document.createElement("ul") as HTMLUListElement;
  checkList.id = TableConfig.checkboxes;

  for (const field of fields) {
    const listItem = document.createElement("li") as HTMLLIElement;
    const checkbox = document.createElement("input") as HTMLInputElement;
    const text = document.createElement("div") as HTMLDivElement;

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = true;

    checkbox.addEventListener("click", () => {
      const selectedStrings = getCheckedInputsValue(checkList);

      if (selectedStrings.length < 1) return;

      const oldSelectFieldName = document.querySelector(
        `#${TableConfig.fieldName}`
      );
      const oldChips = document.querySelector(`#${TableConfig.chipsClassName}`);

      const popUp = document.querySelector(`#${TableConfig.popUpClassName}`);

      const newSelectFieldName = createSelect(selectedStrings);
      const newChips = createDragDropChips(selectedStrings);

      newSelectFieldName.id = TableConfig.fieldName;
      popUp?.replaceChild(newSelectFieldName, oldSelectFieldName as Element);

      newChips.id = TableConfig.chipsClassName;
      popUp?.replaceChild(newChips, oldChips as Element);

      recreateTableConfig()
    });

    text.textContent = field;

    listItem.appendChild(text);
    listItem.appendChild(checkbox);
    checkList.appendChild(listItem);
  }

  return checkList;
};

const createPopUpConfigUI = (metrics: MetricsArchitecture) => {
  const popUp = document.createElement("div") as HTMLDivElement;
  popUp.id = TableConfig.popUpClassName;
  popUp.classList.add(TableConfig.popUpClassName);
  popUp.style.display = "none";

  const closeButton = createButton('X', () => popUp.style.display = "none")

  const cancelButton = createButton('CANCEL', () => popUp.style.display = "none")

  const saveButton = createButton('SAVE', () => {
    const allData = LocalStorage.get(Table.data);
    const newData: ObjectData[] = []
    const tableConfig = LocalStorage.get(TableConfig.configObj);
    const chips = tableConfig.chips

    for (const obj of allData) {
      const temp: ObjectData = {}
      for (const key in obj) {
        for (const headers of chips) {
          if (obj[headers]) {
            temp[headers] = obj[headers]
          }
        }
      }
      newData.push(temp)
    }

    replaceTable(document.querySelector(`#table_section`) as HTMLElement, createUITable(newData))
  })

  const mainText = document.createElement("div");
  mainText.textContent = "Table Configurator";
  mainText.classList.add("mainText");

  const selectPerPage = createSelect([10, 25, 50, 100]);
  selectPerPage.id = TableConfig.perPageClassName;

  popUp.appendChild(mainText);
  popUp.appendChild(closeButton);
  popUp.appendChild(cancelButton);
  popUp.appendChild(saveButton);
  popUp.appendChild(selectPerPage);

  const { fields } = metrics;
  let checkboxesList: HTMLUListElement = createCheckboxesList(fields);

  const checkedHeaders = getCheckedInputsValue(checkboxesList);

  const chips = createDragDropChips(checkedHeaders);
  chips.id = TableConfig.chipsClassName;

  popUp.appendChild(chips);
  popUp.appendChild(checkboxesList);

  const fieldName = createSelect(checkedHeaders);
  fieldName.id = TableConfig.fieldName;

  const sortingValue = createSelect(["ascending", "descending"]);
  sortingValue.id = TableConfig.sorting;

  popUp.appendChild(fieldName);
  popUp.appendChild(sortingValue);

  return popUp;
};

export { createPopUpConfigUI };
