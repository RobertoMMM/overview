import { createPopUpConfigUI } from "./configurator/creatingUI";
import { createMetrics } from "../services/metricsFactory/configMetrics";
import { SERVER, STORAGE, DATA, TableConfig } from "./enum";
import { LocalStorage } from "./helpers/localStorage";
import "../style/configurator.css";
import { updateTablePagination } from "./pagination/tablePagination";
import { Fetch } from "../services/api/api";
import { defaultData } from "../static/default";
import { createTableConfig } from "./configurator/config";

const openConfig = document.getElementById("openConfig") as HTMLButtonElement;
const config = document.getElementById("popUp") as HTMLDivElement;

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
      `SOMETHING WENT WRONG. STATUS CODE: ${error.response.status}. TRY ANOTHER PATH(ex: name, car) ENJOY OUR DEFAULT DATA`
    );
  }
};

openConfig.addEventListener("click", () => {
  config.style.display = "grid";
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

  const { fields } = metrics;

  !LocalStorage.get(TableConfig.configObj) &&
    createTableConfig(fields, fields[0]);

  createPopUpConfigUI(metrics);

  updateTablePagination();
};

createTableFromData();
