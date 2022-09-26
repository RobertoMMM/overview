import { TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";

interface TableConfigurator {
  itemsPerPage: number;
  sortingField: {
    fieldName: string;
    sortingValue: string;
  };
  chips: string[];
  checkboxes: string[];
}

const getCheckedInputsValue = (checkboxes: HTMLUListElement): string[] => {
  const inputs = checkboxes.getElementsByTagName("input");

  const selectedCheckBoxesStrings: string[] = [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      const valueOfLiText = inputs[i].parentElement?.firstChild?.textContent;
      selectedCheckBoxesStrings.push(valueOfLiText as string);
    }
  }

  return selectedCheckBoxesStrings;
};

const createTableConfig = (checkedHeaders: string[]) => {
  LocalStorage.set(TableConfig.configObj, {
    itemsPerPage: 25,
    checkboxes: checkedHeaders,
  });

  return LocalStorage.get(TableConfig.configObj);
};

const getChips = (chips: HTMLUListElement) => {
  const actualChips: string[] = [];

  const liElements = chips.getElementsByTagName("li");
  for (let i = 0; i < liElements.length; i++) {
    actualChips.push(liElements[i].textContent as string);
  }

  return actualChips;
};

const setTableConfig = (tableConfig: TableConfigurator) => {
  LocalStorage.set(TableConfig.configObj, tableConfig);
};

const recreateTableConfig = () => {
  const popUp = document.querySelector(`#${TableConfig.popUpClassName}`) as HTMLElement;

  const perPageOption = (
    popUp.querySelector(
      `#${TableConfig.perPageClassName}`
    ) as HTMLSelectElement
  ).selectedOptions[0].value;

  const fieldSelected = (
    popUp.querySelector(`#${TableConfig.fieldName}`) as HTMLSelectElement
  ).selectedOptions[0].value;

  const sortingMethod = (
    popUp.querySelector(`#${TableConfig.sorting}`) as HTMLSelectElement
  ).selectedOptions[0].value;

  const chips = getChips(
    popUp.querySelector(`#${TableConfig.chipsClassName}`) as HTMLUListElement
  );

  const checkboxes = getCheckedInputsValue(
    popUp.querySelector(`#${TableConfig.checkboxes}`) as HTMLUListElement
  );

  setTableConfig({
    itemsPerPage: parseInt(perPageOption),
    sortingField: {
      fieldName: fieldSelected,
      sortingValue: sortingMethod
    },
    chips: chips,
    checkboxes: checkboxes,
  })
};

export {
  TableConfigurator,
  createTableConfig,
  setTableConfig,
  recreateTableConfig,
  getCheckedInputsValue,
};
