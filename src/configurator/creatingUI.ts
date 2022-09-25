import { MetricsArchitecture } from "../../services/metricsFactory/configMetrics";
import "../../style/configurator.css";
import { TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { getCheckedInputsValue, TableConfigurator } from "./config";

const createCheckboxesList = (fields: string[]): HTMLUListElement => {
  const checkList = document.createElement("ul") as HTMLUListElement;

  for (const field of fields) {
    const listItem = document.createElement("li") as HTMLLIElement;
    const checkbox = document.createElement("input") as HTMLInputElement;
    const text = document.createElement("div") as HTMLDivElement;

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = true;

    checkbox.addEventListener("click", () => {
      const selectedStrings = getCheckedInputsValue(checkList)

      // recreateTableConfig(checkList.parentElement);
    });

    text.textContent = field;

    listItem.appendChild(text);
    listItem.appendChild(checkbox);
    checkList.appendChild(listItem);
  }

  return checkList;
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
  });

  return chipsList;
};

const createSelect = <T,>(itemsPerPage: T[]) => {
  const selectPerPage = document.createElement("select") as HTMLSelectElement;

  for (const items of itemsPerPage) {
    const optionItems = document.createElement("option") as HTMLOptionElement;

    optionItems.textContent = `${items}`;
    selectPerPage.appendChild(optionItems);
  }

  return selectPerPage;
};

const createPopUpConfigUI = (metrics: MetricsArchitecture) => {
  const popUp = document.createElement("div") as HTMLDivElement;
  popUp.id = TableConfig.popUpClassName;
  popUp.classList.add(TableConfig.popUpClassName);

  const closeButton = document.createElement("button") as HTMLButtonElement;
  closeButton.textContent = "X";

  closeButton.addEventListener("click", () => {
    popUp.classList.add("hide");
  });

  const mainText = document.createElement("div");
  mainText.textContent = "Table Configurator";
  mainText.classList.add("mainText");

  const selectPerPage = createSelect([10, 25, 50, 100]);
  selectPerPage.id = TableConfig.perPageClassName;

  popUp.appendChild(mainText);
  popUp.appendChild(closeButton);
  popUp.appendChild(selectPerPage);

  const localStorageTableConfig: TableConfigurator = LocalStorage.get(TableConfig.configObj)

  let fieldName, sortingValue, chips, checkboxesList

  if (localStorageTableConfig) {
    const { checkboxes } = localStorageTableConfig;

    chips = createDragDropChips(checkboxes);
    chips.id = TableConfig.chipsClassName;

    checkboxesList = createCheckboxesList(checkboxes);
    checkboxesList.id = TableConfig.checkboxes;

    const listStringNames = checkboxesList.getElementsByTagName('div')
    const listChekedStrings = checkboxesList.getElementsByTagName('input')

    const checkedHeaders: string[] = []

    for (let i = 0; i < listStringNames.length; i++) {
      if (listChekedStrings[i].checked === true) {
        checkedHeaders.push(listStringNames[i].textContent as string)
      }
    }

    fieldName = createSelect(checkedHeaders)

    sortingValue = createSelect(['ascending', 'descending'])
  } else {
    const { fields } = metrics
    chips = createDragDropChips(fields);
    chips.id = TableConfig.chipsClassName;

    checkboxesList = createCheckboxesList(fields);
    checkboxesList.id = TableConfig.checkboxes;

    const listStringNames = checkboxesList.getElementsByTagName('div')
    const listChekedStrings = checkboxesList.getElementsByTagName('input')

    const checkedHeaders: string[] = []

    for (let i = 0; i < listStringNames.length; i++) {
      if (listChekedStrings[i].checked === true) {
        checkedHeaders.push(listStringNames[i].textContent as string)
      }
    }

    fieldName = createSelect(checkedHeaders)

    sortingValue = createSelect(['ascending', 'descending'])

    LocalStorage.set(TableConfig.configObj, {
      itemsPerPage: 50, 
      checkboxes: checkedHeaders
    })
  }

  popUp.appendChild(fieldName);
  popUp.appendChild(sortingValue);
  popUp.appendChild(chips);
  popUp.appendChild(checkboxesList);

  return popUp;
};

export { createPopUpConfigUI };
