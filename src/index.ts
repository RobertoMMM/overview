import { createUITable, replaceTable } from "./creatingTable/table";
import { createPopUpConfigUI } from "./configurator/creatingUI";
import { createMetrics } from "../services/metricsFactory/configMetrics";
import { SERVER, STORAGE, DATA } from "./enum";
import { ObjectData } from "../services/types";
import { LocalStorage } from "./helpers/localStorage";
import "../style/configurator.css";
import { updateTablePagination } from "./pagination/tablePagination";
import { Fetch } from "../services/api/api";
import { defaultData } from "../static/default";

const inputSearch = document.getElementById("search_field") as HTMLInputElement;
const formSearch = document.getElementById("search_form") as HTMLFormElement;
const openConfig = document.getElementById("openConfig") as HTMLButtonElement;
const dateAddedButton = document.getElementById(
  "dateAddedButton"
) as HTMLButtonElement;
const dataRangePicker = document.getElementById(
  "dataRangePicker"
) as HTMLButtonElement;

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
    ? replaceTable(createUITable(newData))
    : alert("No data found");
};

const saveNewData = async (path: string) => {
  try {
    const URL = `${SERVER.URL}/${path}`;

    const responseFromServer = await Fetch.get(URL);

    LocalStorage.set(DATA.UNIQUE_DATA, responseFromServer);
    LocalStorage.set(DATA.TEMP_DATA, responseFromServer);
  } catch (error: any) {
    LocalStorage.set(DATA.UNIQUE_DATA, defaultData);
    LocalStorage.set(DATA.TEMP_DATA, defaultData);

    alert(
      `SOMETHING WENT WRONG. STATUS CODE: ${error.response.status}. ENJOY OUR DEFAULT DATA`
    );
  }
};

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  filterTableByInput(inputSearch.value);
});

openConfig.addEventListener("click", (e) => {
  const config = document.getElementById("popUp") as HTMLDivElement;

  config.style.display = "grid";
});

dateAddedButton.addEventListener("click", (e) => {
  dataRangePicker.classList.add("show");
});

const createTableFromData = async () => {
  const prevPath = LocalStorage.get(STORAGE.prevPath);

  const currentPath = new URL(window.location.toString()).pathname.replace(
    "/",
    ""
  );

  if (prevPath !== currentPath) {
    await saveNewData(currentPath);
    LocalStorage.set(STORAGE.prevPath, currentPath);
  }

  const metrics = createMetrics("name", LocalStorage.get(DATA.UNIQUE_DATA));

  createPopUpConfigUI(metrics);

  updateTablePagination();
};

createTableFromData();
