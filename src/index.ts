import { createUITable, replaceTable } from "./creatingTable/table";
import { createPopUpConfigUI } from "./configurator/creatingUI";
import { createMetrics } from "../services/metricsFactory/configMetrics";
import { Table } from "./enum";
import { createRandomData } from "../services/randomDataFactory/createRandom";
import { person } from "../services/randomDataFactory/structuredData";
import { ObjectData } from "../services/types";
import { LocalStorage } from "./helpers/localStorage";

const inputSearch = document.getElementById("search_field") as HTMLInputElement;
const formSearch = document.getElementById("search_form") as HTMLFormElement;

const tableSection = document.getElementById(
  "table_section"
) as HTMLTableSectionElement;

const getOrSetData = () => {
  if (!LocalStorage.get(Table.data)) {
    const newData = createRandomData(person, 100);
    LocalStorage.set(Table.data, newData);
  }

  return LocalStorage.get(Table.data);
};

const createTableFromData = () => {
  const response: ObjectData[] = getOrSetData();
  const data = createMetrics("name", response);
  document.body.appendChild(createPopUpConfigUI(data));
  replaceTable(tableSection, createUITable(response));
};

createTableFromData();

const filterTableByInput = (searchString: string) => {
  if (!searchString.length) {
    return replaceTable(tableSection, createUITable(getOrSetData()));
  }

  const newData = getOrSetData().filter((obj: ObjectData) => {
    for (const key in obj) {
      const value = obj[key as keyof typeof obj].toString();
      if (value.toLowerCase().includes(searchString.toLowerCase())) return obj;
    }
  });

  newData.length
    ? replaceTable(tableSection, createUITable(newData))
    : alert("No data found");
};

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  filterTableByInput(inputSearch.value);
});

console.log(localStorage.getItem("tableConfig"));

export { tableSection };
