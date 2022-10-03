import { ObjectData } from "../../services/types";
import { createUITable, replaceTable } from "../creatingTable/table";
import { DATA } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { updateTablePagination } from "../pagination/tablePagination";

const inputSearch = document.getElementById("search_field") as HTMLInputElement;
const formSearch = document.getElementById("searchForm") as HTMLFormElement;

const filterTableByInput = (searchString: string) => {
  if (!searchString.length) {
    return replaceTable(
      createUITable(
        LocalStorage.get(DATA.TEMP_DATA) || LocalStorage.get(DATA.UNIQUE_DATA)
      )
    );
  }

  const storageData =
    LocalStorage.get(DATA.TEMP_DATA) || LocalStorage.get(DATA.UNIQUE_DATA);

  const newData = storageData.filter((obj: ObjectData) => {
    for (const key in obj) {
      const value = obj[key as keyof typeof obj].toString();
      if (value.toLowerCase().includes(searchString.toLowerCase())) return obj;
    }
  });

  newData.length
    ? updateTablePagination(newData.length, newData)
    : alert("No data found");
};

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  filterTableByInput(inputSearch.value);
});
