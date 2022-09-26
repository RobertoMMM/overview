import { ConfigSorting, TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";

interface TableConfigurator {
  itemsPerPage: number;
  sortingField: {
    fieldName: string;
    sortingValue: ConfigSorting.ascending | ConfigSorting.descending;
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

const setTableConfig = (tableConfig: TableConfigurator) => {
  LocalStorage.set(TableConfig.configObj, tableConfig);
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

const recreateTableConfig = (parent: HTMLElement) => {
  const perPageOption = (
    parent.querySelector(
      `#${TableConfig.perPageClassName}`
    ) as HTMLSelectElement
  ).selectedOptions[0].value;

  const fieldSelected = (
    parent.querySelector(`#${TableConfig.fieldName}`) as HTMLSelectElement
  ).selectedOptions[0].value;

  const sortingMethod = (
    parent.querySelector(`#${TableConfig.sorting}`) as HTMLSelectElement
  ).selectedOptions[0].value;

  const chips = getChips(
    parent.querySelector(`#${TableConfig.chipsClassName}`) as HTMLUListElement
  );

  const checkboxes = getCheckedInputsValue(
    parent.querySelector(`#${TableConfig.checkboxes}`) as HTMLUListElement
  );

  console.log(perPageOption, fieldSelected, sortingMethod, chips, checkboxes);
  // setTableConfig()
};

export {
  TableConfigurator,
  createTableConfig,
  setTableConfig,
  recreateTableConfig,
  getCheckedInputsValue,
};
