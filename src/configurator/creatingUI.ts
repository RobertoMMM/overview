import {
  MetricsArchitecture,
  OrderSorting,
  sortData,
} from "../../services/metricsFactory/configMetrics";
import { DataCreationDate } from "../../services/randomDataFactory/dataStructure";
import { ObjectData } from "../../services/types";
import "../../style/configurator.css";
import { DATA } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { updateTablePagination } from "../pagination/tablePagination";
import { getCheckedInputsValue, recreateTableConfig } from "./config";

const closeButton = document.getElementById("closeConfig") as HTMLButtonElement;
const cancelButton = document.getElementById(
  "configCancelButton"
) as HTMLButtonElement;
const saveButton = document.getElementById(
  "configSaveButton"
) as HTMLButtonElement;
const selectPerPage = document.getElementById(
  "selectPerPage"
) as HTMLSelectElement;
const sortingValue = document.getElementById("sorting") as HTMLSelectElement;
const fieldName = document.getElementById("fieldName") as HTMLSelectElement;
const checkboxesList = document.getElementById(
  "checkboxes"
) as HTMLUListElement;
const chipsList = document.getElementById("chipsClassName") as HTMLUListElement;
const popUp = document.getElementById("popUp") as HTMLFormElement;

const OPTIONS_PER_PAGE = [10, 25, 50, 100];

const addClickEventToParent = (parent: HTMLElement, event: () => void) => {
  parent.addEventListener("click", (e) => {
    e.target?.addEventListener("click", event);
  });
};

const appendUpdatedChips = (fields: string[], parent: HTMLUListElement) => {
  parent.textContent = "";

  for (const field of fields) {
    const listItem = document.createElement("li") as HTMLLIElement;
    listItem.setAttribute("draggable", "true");
    const text = document.createElement("div") as HTMLDivElement;

    text.textContent = field;

    listItem.appendChild(text);
    parent.appendChild(listItem);
  }

  let draggedChip: HTMLElement | null;

  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("dragstart", (e: any) => {
    draggedChip = e.target;
  });

  const dropChip = (event: any) => {
    if (!draggedChip) {
      return;
    }
    const targetChip = event.target.parentElement;
    const stringDraggedChilds = draggedChip.innerHTML;
    const stringTargetChilds = targetChip.innerHTML;

    const checking =
      parent.contains(draggedChip) &&
      parent.contains(targetChip) &&
      parent !== targetChip;

    if (checking) {
      draggedChip.innerHTML = stringTargetChilds;
      targetChip.innerHTML = stringDraggedChilds;
    }
  };

  document.addEventListener("drop", (event: any) => {
    dropChip(event);
    recreateTableConfig();
  });
};

const appendUpdatedSelect = <T>(items: T[], parent: HTMLSelectElement) => {
  parent.textContent = "";

  for (const item of items) {
    const optionItem = document.createElement("option") as HTMLOptionElement;

    optionItem.textContent = `${item}`;
    parent.appendChild(optionItem);
  }

  addClickEventToParent(parent, () => {
    recreateTableConfig();
  });
};

const appendUpdatedCheckboxes = (
  fields: string[],
  parent: HTMLUListElement
) => {
  parent.textContent = "";

  for (const field of fields) {
    const listItem = document.createElement("li") as HTMLLIElement;
    const checkbox = document.createElement("input") as HTMLInputElement;
    const text = document.createElement("div") as HTMLDivElement;

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = true;

    text.textContent = field;

    listItem.appendChild(text);
    listItem.appendChild(checkbox);
    parent.appendChild(listItem);

    checkbox.addEventListener("click", () => {
      const selectedStrings = getCheckedInputsValue(parent);

      if (selectedStrings.length < 1) return;

      appendUpdatedChips(selectedStrings, chipsList);
      appendUpdatedSelect(selectedStrings, fieldName);

      recreateTableConfig();
    });
  }
};

const closeConfig = () => (popUp.style.display = "none");

const createNewDataFromConfig = () => {
  const allData = LocalStorage.get(DATA.UNIQUE_DATA);
  const newData: ObjectData[] = [];
  const tableConfig = recreateTableConfig();

  const { fields, sortingField } = tableConfig;
  const { fieldName, sortingValue } = sortingField;

  fields.push(DataCreationDate.hidden);

  // ALGORITHM TO SORT DATA. TIME COMPLEXITY IS O(n2 log n)
  for (const obj of allData) {
    const temp: ObjectData = {};
    for (const key in obj) {
      for (const headers of fields) {
        if (obj[headers]) {
          temp[headers] = obj[headers];
        }
      }
    }
    newData.push(temp);
  }

  const sortedData = sortData(fieldName, newData, sortingValue as OrderSorting);

  LocalStorage.set(DATA.TEMP_DATA, sortedData);

  updateTablePagination();
};

const createPopUpConfigUI = (metrics: MetricsArchitecture) => {
  popUp.style.display = "none";

  const { fields } = metrics;

  appendUpdatedCheckboxes(fields, checkboxesList);

  const checkedHeaders = getCheckedInputsValue(checkboxesList);
  appendUpdatedChips(checkedHeaders, chipsList);

  appendUpdatedSelect(checkedHeaders, fieldName);
  appendUpdatedSelect(OPTIONS_PER_PAGE, selectPerPage);
  appendUpdatedSelect(["ascending", "descending"], sortingValue);
};

cancelButton?.addEventListener("click", (e) => {
  e.preventDefault();
  closeConfig();
});

closeButton?.addEventListener("click", (e) => {
  e.preventDefault();
  closeConfig();
});

saveButton?.addEventListener("click", (e) => {
  e.preventDefault();
  createNewDataFromConfig();
});

export { createPopUpConfigUI };
