import { createUITable, replaceTable } from "./creatingTable/table";
import { createPopUpConfigUI } from "./configurator/creatingUI";
import { createMetrics } from "../services/metricsFactory/configMetrics";
import { Storage, Table } from "./enum";
import {
  DataCreationDate,
  RANDOM_DATA,
} from "../services/randomDataFactory/structuredData";
import { ObjectData } from "../services/types";
import { LocalStorage } from "./helpers/localStorage";
import "../style/configurator.css";
import { createRandomData } from "../services/randomDataFactory/createRandom";
import { updateTablePagination } from "./pagination/tablePagination";

const inputSearch = document.getElementById("search_field") as HTMLInputElement;
const formSearch = document.getElementById("search_form") as HTMLFormElement;
const openConfig = document.getElementById("openConfig") as HTMLButtonElement;
const dateInputFrom = document.getElementById("dateStart") as HTMLInputElement;
const dateInputTo = document.getElementById("dateEnd") as HTMLInputElement;

const filterTableByInput = (searchString: string) => {
  if (!searchString.length) {
    return replaceTable(
      createUITable(
        LocalStorage.get(Table.tempData) || LocalStorage.get(Table.data)
      )
    );
  }

  const storageData =
    LocalStorage.get(Table.tempData) || LocalStorage.get(Table.data);

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

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  filterTableByInput(inputSearch.value);
});

openConfig.addEventListener("click", (e) => {
  const config = document.getElementById("popUp") as HTMLDivElement;

  config.style.display = "grid";
});

const convertDateToString = (date: Date) => {
  const month =
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1;
  const day =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  const year =
    date.getUTCFullYear() < 10
      ? `0${date.getUTCFullYear()}`
      : date.getUTCFullYear();

  return `${month}-${day}-${year}`;
};

const filterTableByRangeDate = (minDate: string, maxDate: string) => {
  const storageData =
    LocalStorage.get(Table.tempData) || LocalStorage.get(Table.data);

  const newData = storageData.filter((obj: ObjectData) => {
    const isInRange =
      obj[DataCreationDate.hidden] > minDate &&
      maxDate > obj[DataCreationDate.hidden];
    if (obj[DataCreationDate.hidden] && isInRange) return obj;
  });

  newData.length
    ? replaceTable(createUITable(newData))
    : alert("No data found");
};

const minDate = new Date("01.01.2020").toISOString().split("T")[0];
const maxDate = new Date().toISOString().split("T")[0];

dateInputFrom.min = minDate;
dateInputFrom.max = maxDate;
dateInputTo.min = minDate;
dateInputTo.max = maxDate;

dateInputFrom.addEventListener("change", (e: any) => {
  if (!dateInputTo.value) return;

  const dateFrom = convertDateToString(new Date(e.target.value));
  const dateTo = convertDateToString(new Date(dateInputTo.value));

  dateTo > dateFrom && filterTableByRangeDate(dateFrom, dateTo);
});

dateInputTo.addEventListener("change", (e: any) => {
  if (!dateInputFrom.value) return alert("Please select all dates fields");

  const dateTo = convertDateToString(new Date(e.target.value));
  const dateFrom = convertDateToString(new Date(dateInputFrom.value));

  dateFrom && filterTableByRangeDate(dateFrom, dateTo);
});

const createTableFromData = () => {
  const prevPath = LocalStorage.get(Storage.prevPath);
  const currentPath = new URL(window.location.toString()).pathname.replace(
    "/",
    ""
  );

  if (prevPath !== currentPath) {
    const obj =
      RANDOM_DATA[currentPath as keyof typeof RANDOM_DATA] ||
      Object.values(RANDOM_DATA)[0];

    const newData = createRandomData(obj, 100);

    LocalStorage.set(Table.data, newData);
    LocalStorage.set(Table.tempData, newData);
    LocalStorage.set(Storage.prevPath, currentPath);
  }

  const data = createMetrics("name", LocalStorage.get(Table.data));

  createPopUpConfigUI(data);

  updateTablePagination();
};

createTableFromData();
