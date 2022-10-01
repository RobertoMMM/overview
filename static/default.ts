const defaultData = [
  {
    name: "user5",
    surname: "userFamily7",
    email: "user1@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 6,
    job: "pythondev",
    hobby: "hokey",
    creationDate: "06-30-2022",
  },
  {
    name: "user8",
    surname: "userFamily9",
    email: "user9@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 8,
    job: "automatic tester",
    hobby: "basket",
    creationDate: "07-21-2022",
  },
  {
    name: "user3",
    surname: "userFamily2",
    email: "user5@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 8,
    job: "manual tester",
    hobby: "hokey",
    creationDate: "06-30-2022",
  },
  {
    name: "user8",
    surname: "userFamily3",
    email: "user4@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 8,
    job: "cppdev",
    hobby: "football",
    creationDate: "09-25-2022",
  },
  {
    name: "user4",
    surname: "userFamily2",
    email: "user1@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 6,
    job: "automatic tester",
    hobby: "volley",
    creationDate: "07-21-2022",
  },
  {
    name: "user4",
    surname: "userFamily3",
    email: "user3@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 15,
    job: "javadev",
    hobby: "basket",
    creationDate: "06-30-2022",
  },
  {
    name: "user9",
    surname: "userFamily10",
    email: "user7@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 7,
    job: "cppdev",
    hobby: "basket",
    creationDate: "02-04-2021",
  },
  {
    name: "user10",
    surname: "userFamily4",
    email: "user1@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 3,
    job: "manual tester",
    hobby: "football",
    creationDate: "02-04-2022",
  },
  {
    name: "user4",
    surname: "userFamily1",
    email: "user3@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 7,
    job: "automatic tester",
    hobby: "basket",
    creationDate: "02-04-2022",
  },
  {
    name: "user8",
    surname: "userFamily3",
    email: "user3@gmail.com",
    dateOfBirth: "06-30-2020",
    age: 4,
    job: "cppdev",
    hobby: "biliard",
    creationDate: "02-04-2021",
  },
  {
    name: "user8",
    surname: "userFamily2",
    email: "user4@gmail.com",
    dateOfBirth: "09-25-2020",
    age: 10,
    job: "manual tester",
    hobby: "basket",
    creationDate: "04-12-2020",
  },
  {
    name: "user2",
    surname: "userFamily4",
    email: "user3@gmail.com",
    dateOfBirth: "06-11-2020",
    age: 6,
    job: "javadev",
    hobby: "basket",
    creationDate: "06-11-2022",
  },
  {
    name: "user2",
    surname: "userFamily3",
    email: "user3@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 4,
    job: "javadev",
    hobby: "biliard",
    creationDate: "02-04-2021",
  },
  {
    name: "user5",
    surname: "userFamily9",
    email: "user2@gmail.com",
    dateOfBirth: "06-10-2020",
    age: 10,
    job: "manual tester",
    hobby: "hokey",
    creationDate: "04-12-2020",
  },
  {
    name: "user1",
    surname: "userFamily7",
    email: "user6@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 4,
    job: "manual tester",
    hobby: "volley",
    creationDate: "07-03-2021",
  },
  {
    name: "user6",
    surname: "userFamily5",
    email: "user6@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 11,
    job: "manual tester",
    hobby: "football",
    creationDate: "08-02-2021",
  },
  {
    name: "user8",
    surname: "userFamily10",
    email: "user7@gmail.com",
    dateOfBirth: "05-22-2020",
    age: 16,
    job: "automatic tester",
    hobby: "basket",
    creationDate: "09-25-2022",
  },
  {
    name: "user5",
    surname: "userFamily9",
    email: "user6@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 14,
    job: "javadev",
    hobby: "hokey",
    creationDate: "09-25-2022",
  },
  {
    name: "user4",
    surname: "userFamily7",
    email: "user3@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 4,
    job: "automatic tester",
    hobby: "basket",
    creationDate: "04-12-2020",
  },
  {
    name: "user1",
    surname: "userFamily6",
    email: "user1@gmail.com",
    dateOfBirth: "08-02-2020",
    age: 12,
    job: "automatic tester",
    hobby: "hokey",
    creationDate: "05-22-2022",
  },
  {
    name: "user10",
    surname: "userFamily5",
    email: "user4@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 8,
    job: "cppdev",
    hobby: "hokey",
    creationDate: "04-12-2020",
  },
  {
    name: "user10",
    surname: "userFamily8",
    email: "user7@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 7,
    job: "pythondev",
    hobby: "basket",
    creationDate: "07-21-2022",
  },
  {
    name: "user4",
    surname: "userFamily9",
    email: "user6@gmail.com",
    dateOfBirth: "06-30-2020",
    age: 2,
    job: "javadev",
    hobby: "biliard",
    creationDate: "05-22-2022",
  },
  {
    name: "user1",
    surname: "userFamily5",
    email: "user9@gmail.com",
    dateOfBirth: "05-22-2020",
    age: 14,
    job: "manual tester",
    hobby: "biliard",
    creationDate: "04-12-2020",
  },
  {
    name: "user1",
    surname: "userFamily10",
    email: "user2@gmail.com",
    dateOfBirth: "06-30-2020",
    age: 8,
    job: "automatic tester",
    hobby: "football",
    creationDate: "09-25-2022",
  },
  {
    name: "user2",
    surname: "userFamily6",
    email: "user8@gmail.com",
    dateOfBirth: "06-10-2020",
    age: 7,
    job: "webdev",
    hobby: "hokey",
    creationDate: "06-10-2022",
  },
  {
    name: "user1",
    surname: "userFamily8",
    email: "user6@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 12,
    job: "webdev",
    hobby: "volley",
    creationDate: "04-12-2020",
  },
  {
    name: "user10",
    surname: "userFamily9",
    email: "user10@gmail.com",
    dateOfBirth: "09-25-2020",
    age: 11,
    job: "cppdev",
    hobby: "volley",
    creationDate: "07-21-2022",
  },
  {
    name: "user8",
    surname: "userFamily10",
    email: "user7@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 1,
    job: "javadev",
    hobby: "football",
    creationDate: "04-12-2020",
  },
  {
    name: "user4",
    surname: "userFamily10",
    email: "user1@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 9,
    job: "automatic tester",
    hobby: "hokey",
    creationDate: "07-03-2021",
  },
  {
    name: "user3",
    surname: "userFamily2",
    email: "user5@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 5,
    job: "pythondev",
    hobby: "volley",
    creationDate: "06-11-2022",
  },
  {
    name: "user2",
    surname: "userFamily5",
    email: "user9@gmail.com",
    dateOfBirth: "06-10-2020",
    age: 9,
    job: "cppdev",
    hobby: "hokey",
    creationDate: "02-04-2022",
  },
  {
    name: "user7",
    surname: "userFamily8",
    email: "user8@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 6,
    job: "pythondev",
    hobby: "basket",
    creationDate: "07-03-2021",
  },
  {
    name: "user6",
    surname: "userFamily6",
    email: "user8@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 16,
    job: "javadev",
    hobby: "biliard",
    creationDate: "02-04-2022",
  },
  {
    name: "user1",
    surname: "userFamily4",
    email: "user6@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 8,
    job: "manual tester",
    hobby: "volley",
    creationDate: "02-04-2022",
  },
  {
    name: "user3",
    surname: "userFamily5",
    email: "user4@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 15,
    job: "webdev",
    hobby: "hokey",
    creationDate: "06-11-2022",
  },
  {
    name: "user8",
    surname: "userFamily9",
    email: "user1@gmail.com",
    dateOfBirth: "07-21-2020",
    age: 11,
    job: "manual tester",
    hobby: "football",
    creationDate: "05-22-2022",
  },
  {
    name: "user1",
    surname: "userFamily1",
    email: "user6@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 13,
    job: "cppdev",
    hobby: "basket",
    creationDate: "04-12-2020",
  },
  {
    name: "user4",
    surname: "userFamily5",
    email: "user6@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 6,
    job: "cppdev",
    hobby: "football",
    creationDate: "06-10-2022",
  },
  {
    name: "user10",
    surname: "userFamily1",
    email: "user7@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 15,
    job: "pythondev",
    hobby: "biliard",
    creationDate: "06-11-2022",
  },
  {
    name: "user7",
    surname: "userFamily7",
    email: "user7@gmail.com",
    dateOfBirth: "05-22-2020",
    age: 12,
    job: "cppdev",
    hobby: "basket",
    creationDate: "09-25-2022",
  },
  {
    name: "user9",
    surname: "userFamily3",
    email: "user5@gmail.com",
    dateOfBirth: "08-02-2020",
    age: 2,
    job: "pythondev",
    hobby: "biliard",
    creationDate: "02-04-2022",
  },
  {
    name: "user1",
    surname: "userFamily1",
    email: "user10@gmail.com",
    dateOfBirth: "06-11-2020",
    age: 16,
    job: "webdev",
    hobby: "hokey",
    creationDate: "06-11-2022",
  },
  {
    name: "user7",
    surname: "userFamily7",
    email: "user8@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 9,
    job: "javadev",
    hobby: "biliard",
    creationDate: "04-12-2020",
  },
  {
    name: "user8",
    surname: "userFamily2",
    email: "user4@gmail.com",
    dateOfBirth: "08-02-2020",
    age: 10,
    job: "javadev",
    hobby: "hokey",
    creationDate: "02-04-2021",
  },
  {
    name: "user5",
    surname: "userFamily5",
    email: "user9@gmail.com",
    dateOfBirth: "07-03-2020",
    age: 1,
    job: "cppdev",
    hobby: "football",
    creationDate: "08-02-2021",
  },
  {
    name: "user1",
    surname: "userFamily5",
    email: "user9@gmail.com",
    dateOfBirth: "06-11-2020",
    age: 7,
    job: "javadev",
    hobby: "football",
    creationDate: "04-12-2020",
  },
  {
    name: "user8",
    surname: "userFamily7",
    email: "user1@gmail.com",
    dateOfBirth: "02-04-2020",
    age: 11,
    job: "manual tester",
    hobby: "biliard",
    creationDate: "09-25-2022",
  },
  {
    name: "user8",
    surname: "userFamily1",
    email: "user10@gmail.com",
    dateOfBirth: "04-12-2020",
    age: 1,
    job: "javadev",
    hobby: "biliard",
    creationDate: "07-03-2021",
  },
  {
    name: "user2",
    surname: "userFamily4",
    email: "user5@gmail.com",
    dateOfBirth: "06-10-2020",
    age: 3,
    job: "javadev",
    hobby: "biliard",
    creationDate: "06-11-2022",
  },
];

const defaultDataKeys = Object.keys(defaultData);

const defaultConfig = {
  itemsPerPage: 50,
  sortingField: {
    fieldName: defaultDataKeys[0],
    sortingValue: "ascending",
  },
  chips: defaultDataKeys,
  checkboxes: defaultDataKeys,
};

export { defaultConfig, defaultData };