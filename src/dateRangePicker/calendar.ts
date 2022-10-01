import { DataCreationDate } from "../../services/randomDataFactory/dataStructure";
import { ObjectData } from "../../services/types";
import { DATA } from "../enum";
import { LocalStorage } from "../helpers/localStorage";
import { updateTablePagination } from "../pagination/tablePagination";

const monthPicker = document.getElementById("monthPicker") as HTMLSpanElement;
const dataRangePicker = document.getElementById(
  "dataRangePicker"
) as HTMLDivElement;
const monthList = dataRangePicker.querySelector(
  "#monthsList"
) as HTMLDivElement;
const pickerHeader = document.getElementById("pickerHeader") as HTMLDivElement;
const pickerBody = document.getElementById("pickerBody") as HTMLDivElement;
const calendarDays = document.getElementById("days") as HTMLDivElement;
const headerYear = document.getElementById("year") as HTMLSpanElement;
const prevButton = document.getElementById(
  "yearPrevButton"
) as HTMLButtonElement;
const nextButton = document.getElementById(
  "yearNextButton"
) as HTMLButtonElement;

const MIN_YEAR = 2020;
const currentDate = new Date();
const dateMonth = { value: currentDate.getMonth() };
const dateYear = { value: currentDate.getFullYear() };

const isLeapYear = (year: number) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year: number) => {
  return isLeapYear(year) ? 29 : 28;
};

const filterTableByRangeDate = (minDate: Date, maxDate: Date) => {
  const storageData =
    LocalStorage.get(DATA.TEMP_DATA) || LocalStorage.get(DATA.UNIQUE_DATA);

  const newData = storageData.filter((obj: ObjectData) => {
    const stringToDate = new Date(obj[DataCreationDate.hidden] as string);
    const isInRange = stringToDate > minDate && stringToDate < maxDate;

    if (isInRange) return obj;
  });

  newData.length
    ? updateTablePagination(undefined, newData)
    : alert("No data found");
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];

const dateDaysSelected: Date[] = [];

const generateCalendar = (month: number, year: number) => {
  calendarDays.textContent = "";

  const yearMonthDays = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  monthPicker.textContent = monthNames[month];
  headerYear.textContent = year.toString();

  const firstDay = new Date(year, month, 1);

  for (let i = 0; i <= yearMonthDays[month] + firstDay.getDay() - 1; i++) {
    const dayText = document.createElement("div");
    dayText.className = 'eachDay'
    const dayValue = i - firstDay.getDay() + 1;

    if (i >= firstDay.getDay()) {
      dayText.textContent = (i - firstDay.getDay() + 1).toString();
    }

    dayText.addEventListener("click", () => {
      const date = new Date(dateYear.value, dateMonth.value, dayValue);

      dayText.classList.add('clicked')

      dateDaysSelected.push(date);

      if (dateDaysSelected.length === 2) {
        const [min, max] = dateDaysSelected;

        filterTableByRangeDate(min, max);

        dataRangePicker.classList.remove("show");
        dateDaysSelected.length = 0;
      }

      if (dateDaysSelected.length > 2) {
        dateDaysSelected.length = 0;
      }
    });
    calendarDays.appendChild(dayText);
  }
};

for (const [index, monthName] of monthNames.entries()) {
  const month = document.createElement("div");

  month.textContent = monthName;

  month.addEventListener("click", () => {
    monthList.classList.remove("show");
    pickerHeader.classList.remove("hide");
    pickerBody.classList.remove("hide");

    dateMonth.value = index;

    generateCalendar(dateMonth.value, dateYear.value);
  });

  monthList.appendChild(month);
}

monthPicker.addEventListener("click", () => {
  monthList.classList.add("show");
  pickerHeader.classList.add("hide");
  pickerBody.classList.add("hide");
});

prevButton.addEventListener("click", () => {
  if (dateYear.value - 1 >= MIN_YEAR) {
    --dateYear.value;
    generateCalendar(dateMonth.value, dateYear.value);
  }
});

nextButton.addEventListener("click", () => {
  const currentYear = new Date().getFullYear();

  if (dateYear.value + 1 <= currentYear) {
    ++dateYear.value;
    generateCalendar(dateMonth.value, dateYear.value);
  }
});

generateCalendar(dateMonth.value, dateYear.value);
