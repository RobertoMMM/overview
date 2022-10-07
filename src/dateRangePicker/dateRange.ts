import { DataCreationDate } from "../../services/randomDataFactory/dataStructure";
import { ObjectData } from "../../services/types";
import { DATA } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { updateTablePagination } from "../pagination/tablePagination";
import { easepick, LockPlugin, RangePlugin } from "@easepick/bundle";

const rangeForm = document.getElementById("rangeForm") as HTMLFormElement;
const inputDate = document.getElementById("range") as HTMLInputElement;

const MIN_DATE = new Date(2020, 1, 1);
const MAX_DATE = new Date();

const filterTableByRangeDate = (minDate: Date, maxDate: Date) => {
  const storageData =
    LocalStorage.get(DATA.TEMP_DATA) || LocalStorage.get(DATA.UNIQUE_DATA);

  const newData = storageData.filter((obj: ObjectData) => {
    const stringToDate = new Date(obj[DataCreationDate.hidden] as string);
    const isInRange = stringToDate > minDate && stringToDate < maxDate;

    if (isInRange) return obj;
  });

  newData.length
    ? updateTablePagination({ data: newData })
    : alert("No data found");
};

// config object for easepick library
const configRange = {
  element: inputDate,
  css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"],
  zIndex: 10,
  RangePlugin: {
    delimiter: "  ",
  },
  LockPlugin: {
    minDate: MIN_DATE,
    maxDate: MAX_DATE,
    minDays: 2,
  },
  plugins: [RangePlugin, LockPlugin],
};

// ####CREATING RANGE_INPUT####
new easepick.create(configRange);
// ####CREATING RANGE_INPUT####

const createTwoDatesFromInput = (date: string) => {
  const [minDate, maxDate] = date.split(" ").filter((date) => date !== "");

  return { minDate: new Date(minDate), maxDate: new Date(maxDate) };
};

rangeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputDate.value;

  const { minDate, maxDate } = createTwoDatesFromInput(inputValue);

  minDate && maxDate && filterTableByRangeDate(minDate, maxDate);
});
