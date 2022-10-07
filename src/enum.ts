enum DATA {
  UNIQUE_DATA = "UNIQUE_DATA", // UNTOUCHED DATA FETCHED FROM SERVER.
  TEMP_DATA = "TEMP_DATA", // TEMPORARY DATA FROM CONFIG
  PAGINATION_DATA = "PAGINATION_DATA", // DATA DIVIDED BY PER PAGE NUMBER
}

enum TABLE {
  PARENT = "table_section", // THIS NEEDS TO BE UNIQUE SECTION ELEMENT ID
  HEADER_ROW_ID = "headerID",
  TABLE_ID = "table_id",
  SORTING_BUTTON_CLASS = "sortButton",
}

enum TableConfig {
  configObj = "tableConfig",
  popUpClassName = "popUp",
  perPageClassName = "selectPerPage",
  chipsClassName = "chipsClassName",
  checkboxes = "checkboxes",
  fieldName = "fieldName",
  sorting = "sorting",
}

enum SERVER {
  URL = "http://localhost:3000",
}

enum STORAGE {
  prevPath = "prevPath", // PREVIOUS URL PATHNAME
}

export { DATA, TableConfig, STORAGE, SERVER, TABLE };
