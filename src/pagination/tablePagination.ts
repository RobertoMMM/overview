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

  const loopLength = Math.ceil(allData.length / itemsPerPage);

  let counter = 0;

  for (let i = 0; i < loopLength; i++) {
    const endSlice =
      counter + itemsPerPage > allData.length
        ? allData.length
        : counter + itemsPerPage;
    const data = allData.slice(counter, endSlice);
    formattedData[i] = data;
    counter += itemsPerPage;
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
  prevButton.disabled = false;
  nextButton.disabled = false;

  LocalStorage.set(DATA.PAGINATION_DATA, formattedData);
};

const checkCurrentPage = (current: number, action: "prev" | "next") => {
  if (typeof current !== "number") return;

  const maxInputValue = parseInt(currentPageInput.max);

  const isLessThanDataLength = current < maxInputValue;
  const isPossitive = current > 0;

  if (!isLessThanDataLength) {
    nextButton.disabled = true;
  }

  if (!isPossitive) {
    prevButton.disabled = true;
  }

  if (isLessThanDataLength && action === "next") {
    prevButton.disabled = false;
    return current + 1;
  }
  if (isPossitive && action === "prev") {
    nextButton.disabled = false;
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

  const checkedNumberPage = checkCurrentPage(currentPage, "prev") || 0;

  currentPageInput.value = checkedNumberPage.toString();

  replaceTable(
    createUITable(formattedData[checkedNumberPage as number] as ObjectData[])
  );
});

currentPageInput.addEventListener("input", (e: any) => {
  const formattedData = LocalStorage.get(DATA.PAGINATION_DATA);

  const checkInput = () => {
    const maxInputValue = parseInt(currentPageInput.max);

    if (e.target.value <= maxInputValue) {
      const userNumber = parseInt(currentPageInput.value);

      replaceTable(createUITable(formattedData[userNumber]));
    }
  };

  setTimeout(checkInput, 400);
});

perPageInput.addEventListener("input", (e: any) => {
  const checkInput = () => {
    if (e.target.value) {
      const userNumber = parseInt(perPageInput.value);

      updateTablePagination(userNumber);
    }
  };

  setTimeout(checkInput, 400);
});

export { updateTablePagination };
