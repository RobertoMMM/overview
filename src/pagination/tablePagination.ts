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

const formatData = (allData: ObjectData[], itemsPerPage: number) => {
  const formattedData: ObjectData = {};

  let counter = 1;
  let i = 0;
  while (counter <= allData.length) {
    const endSlice =
      counter + itemsPerPage - 1 > allData.length
        ? allData.length - 1
        : counter + itemsPerPage - 1;
    const data = allData.slice(counter - 1, endSlice);
    formattedData[i] = data;
    counter += itemsPerPage;
    i++;
  }
  return formattedData;
};

const updateTablePagination = (
  perPageItems?: number,
  allData?: ObjectData[]
) => {
  const data =
    allData ||
    LocalStorage.get(DATA.TEMP_DATA) ||
    LocalStorage.get(DATA.UNIQUE_DATA);

  const { itemsPerPage } = LocalStorage.get(TableConfig.configObj) || {
    itemsPerPage: 10,
  };

  const perPage = perPageItems || itemsPerPage;

  const formattedData = formatData(data, perPage);
  const formattedDataLength = Object.keys(formattedData).length - 1;

  currentPageInput.max = formattedDataLength.toString();

  replaceTable(createUITable(formattedData[0] as ObjectData[]));
  // prevButton.disabled = true;

  LocalStorage.set(DATA.PAGINATION_DATA, formattedData);
};

const checkCurrentPage = (current: number, action: "prev" | "next") => {
  if (typeof current !== "number") return;

  const maxInputValue = parseInt(currentPageInput.max);
  const formattedDataLength: number = maxInputValue;

  const isLessThanDataLength = current < formattedDataLength;
  const isPossitive = current > 0;

  // if (!isLessThanDataLength) {
  //   nextButton.disabled = true;
  // }

  // if (!isPossitive) {
  //   prevButton.disabled = true;
  // }

  // if (current < formattedDataLength && isPossitive) {
  //   nextButton.disabled = false;
  //   prevButton.disabled = false;
  // }

  if (isLessThanDataLength && action === "next") return current + 1;
  if (isPossitive && action === "prev") return current - 1;
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

  const checkedNumberPage = checkCurrentPage(currentPage, "prev") || 0;

  currentPageInput.value = checkedNumberPage.toString();

  replaceTable(
    createUITable(formattedData[checkedNumberPage as number] as ObjectData[])
  );
});

currentPageInput.addEventListener("input", (e: any) => {
  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);

  setTimeout(() => {
    if (!e.target.value) return (currentPageInput.value = "0");
    const userNumber = parseInt(currentPageInput.value);
    replaceTable(createUITable(formattedData[userNumber]));
  }, 300);
});

perPageInput.addEventListener("input", (e: any) => {
  if (!e.target.value) return (perPageInput.value = "0");
  const userNumber = parseInt(perPageInput.value);

  updateTablePagination(userNumber);
});

export { updateTablePagination };
