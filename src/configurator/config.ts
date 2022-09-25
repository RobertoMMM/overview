import { TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";

interface TableConfigurator {
  itemsPerPage: number;
  // sortingField: {
  //   fieldName: string;
  //   sortingValue: string;
  // };
  // chips: string[];
  checkboxes: string[];
}

const getCheckedInputsValue = (checkBoxes: HTMLElement) => {
  const inputs = checkBoxes.getElementsByTagName("input");

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

const recreateTableConfig = (parent: HTMLElement) => {
  const itemsPerPage = parent.querySelector(
    `#${TableConfig.perPageClassName}`
  ) as HTMLElement;
  const chips = parent.querySelector(
    `#${TableConfig.chipsClassName}`
  ) as HTMLElement;
  const checkBoxes = parent.querySelector(
    `#${TableConfig.checkboxes}`
  ) as HTMLElement;


  // setTableConfig()
};


export { TableConfigurator, setTableConfig, recreateTableConfig, getCheckedInputsValue };
