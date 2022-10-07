import { ObjectData } from "../../services/types";
import { createUITable, replaceTable } from "../creatingTable/table";
import { DATA, TableConfig } from "../enum";
import { LocalStorage } from "../helpers/localStorage";

const perPageInput = document.getElementById(
  "currentPerPage"
) as HTMLInputElement;
const currentPageInput = document.getElementById(
  "currentPage"
) as HTMLInputElement;

const prevButton = document.getElementById("prevPage") as HTMLButtonElement;
const nextButton = document.getElementById("nextPage") as HTMLButtonElement;

const MIN_CURRENT_PAGE = 1;
const DELAY_SECONDS = 400;

const formatData = (allData: ObjectData[], itemsPerPage: number) => {
  const formattedData: ObjectData = {};

  const loopLength = Math.ceil(allData.length / itemsPerPage);

  let counter = 0;

  for (let i = 1; i <= loopLength; i++) {
    const isMoreThanData = counter + itemsPerPage > allData.length;

    const endSlice = isMoreThanData ? allData.length : counter + itemsPerPage;

    const data = allData.slice(counter, endSlice);
    formattedData[i] = data;
    counter += itemsPerPage;
  }

  return formattedData;
};

interface TablePage {
  itemsPerPage?: number;
  data?: ObjectData[];
}

const updateTablePagination = (params?: TablePage) => {
  const { itemsPerPage, data } = params || {};

  const localStorageData =
    data ||
    LocalStorage.get(DATA.TEMP_DATA) ||
    LocalStorage.get(DATA.UNIQUE_DATA);

  const { itemsPerPage: configItemsPerPage } = LocalStorage.get(
    TableConfig.configObj
  );

  const perPage = itemsPerPage || configItemsPerPage;

  const formattedData = formatData(localStorageData, perPage);
  const formattedDataLength = Object.keys(formattedData).length;

  currentPageInput.max = formattedDataLength.toString();
  currentPageInput.value = MIN_CURRENT_PAGE.toString();

  perPageInput.value = perPage.toString();

  replaceTable(createUITable(formattedData[MIN_CURRENT_PAGE] as ObjectData[]));

  prevButton.disabled = parseInt(currentPageInput.value) <= MIN_CURRENT_PAGE;
  nextButton.disabled = parseInt(currentPageInput.value) >= formattedDataLength;

  LocalStorage.set(DATA.PAGINATION_DATA, formattedData);
};

type ButtonActions = "prev" | "next";

const checkCurrentPage = (current: number, action: ButtonActions) => {
  if (typeof current !== "number") return;

  const maxInputValue = parseInt(currentPageInput.max);

  const isLessThanDataLength = current < maxInputValue;
  const isPossitive = current > MIN_CURRENT_PAGE;

  if (isLessThanDataLength && action === "next") {
    prevButton.disabled = false;

    nextButton.disabled = !(current < maxInputValue - 1);

    return current + 1;
  }

  if (isPossitive && action === "prev") {
    nextButton.disabled = false;

    prevButton.disabled = current < MIN_CURRENT_PAGE + 2;

    return current - 1;
  }
};

nextButton?.addEventListener("click", (e) => {
  e.preventDefault();

  const maxInputValue = parseInt(currentPageInput.max);
  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);
  const currentPage = parseInt(currentPageInput.value);

  const checkedNumberPage =
    checkCurrentPage(currentPage, "next") || maxInputValue;

  currentPageInput.value = checkedNumberPage.toString();

  replaceTable(
    createUITable(formattedData[checkedNumberPage as number] as ObjectData[])
  );
});

prevButton?.addEventListener("click", (e) => {
  e.preventDefault();

  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);
  const currentPage = parseInt(currentPageInput.value);

  const checkedNumberPage =
    checkCurrentPage(currentPage, "prev") || MIN_CURRENT_PAGE;

  currentPageInput.value = checkedNumberPage.toString();

  replaceTable(
    createUITable(formattedData[checkedNumberPage as number] as ObjectData[])
  );
});

currentPageInput.addEventListener("input", (e: any) => {
  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);

  const checkInput = () => {
    const maxInputValue = parseInt(currentPageInput.max);

    if (e.target.value <= maxInputValue && e.target.value >= MIN_CURRENT_PAGE) {
      const userNumber = parseInt(currentPageInput.value);

      replaceTable(createUITable(formattedData[userNumber]));
    }
  };

  setTimeout(checkInput, DELAY_SECONDS);
});

perPageInput.addEventListener("input", (e: any) => {
  const checkInput = () => {
    if (e.target.value > MIN_CURRENT_PAGE - 1) {
      const userNumber = parseInt(perPageInput.value);

      updateTablePagination({ itemsPerPage: userNumber });
    }
  };

  setTimeout(checkInput, DELAY_SECONDS);
});

export { updateTablePagination };
