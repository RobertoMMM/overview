import { tableSection } from "..";
import { Additionally, DataObject } from "./additionalOptions";
import { getDataFromLocalStorage } from "./localStorage";
import { createUITable, replaceTable } from "../creatingTable/table";

const sortCheckedRows = () => {
  const newData = getDataFromLocalStorage("original_data");

  newData.sort(
    (a: any, b: any) =>
      a.additionalOptions.checkbox - b.additionalOptions.checkbox
  );
  // replaceTable(tableSection, createUITable(newData))
  localStorage.setItem("original_data", JSON.stringify(newData));
};

const appendCheckboxWithText = (content: string) => {
  const checkbox = document.createElement("input") as HTMLInputElement;
  const text = document.createElement("div") as HTMLDivElement;

  checkbox.setAttribute("type", "checkbox");

  text.textContent = content;

  return { text, checkbox };
};

// change checkbox value and save new data to localStorage
const changeCheckboxValue = (isChecked: boolean, dataObject: DataObject) => {
  const newData = getDataFromLocalStorage("original_data");

  for (const obj of newData) {
    if (JSON.stringify(obj) === JSON.stringify(dataObject)) {
      obj[Additionally.additionalKeyName] = {
        checkbox: isChecked,
      };
    }
  }

  localStorage.setItem("original_data", JSON.stringify(newData));
};

const addClickEventToElement = (
  input: HTMLInputElement,
  dataObject: DataObject
) => {
  input.addEventListener("click", () => {
    changeCheckboxValue(input.checked, dataObject);
    sortCheckedRows();
    replaceTable(
      tableSection,
      createUITable(getDataFromLocalStorage("original_data"))
    );
  });
};

export { appendCheckboxWithText, addClickEventToElement, sortCheckedRows };
