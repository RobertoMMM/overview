enum DataCreationDate {
  hidden = "creationDate",
}

const RANDOM_DATA = {
  name: [
    {
      key: "name",
      possibleValues: [
        "user1",
        "user2",
        "user3",
        "user4",
        "user5",
        "user6",
        "user7",
        "user8",
        "user9",
        "user10",
      ],
    },
    {
      key: "surname",
      possibleValues: [
        "userFamily1",
        "userFamily2",
        "userFamily3",
        "userFamily4",
        "userFamily5",
        "userFamily6",
        "userFamily7",
        "userFamily8",
        "userFamily9",
        "userFamily10",
      ],
    },
    {
      key: "email",
      possibleValues: [
        "user1@gmail.com",
        "user2@gmail.com",
        "user3@gmail.com",
        "user4@gmail.com",
        "user5@gmail.com",
        "user6@gmail.com",
        "user7@gmail.com",
        "user8@gmail.com",
        "user9@gmail.com",
        "user10@gmail.com",
      ],
    },
    {
      key: "dateOfBirth",
      possibleValues: [
        "07-03-2020",
        "08-02-2020",
        "02-04-2020",
        "04-12-2020",
        "09-25-2020",
        "06-30-2020",
        "05-22-2020",
        "06-11-2020",
        "06-10-2020",
        "07-21-2020",
        "02-04-2020",
      ],
    },
    {
      key: "age",
      possibleValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      key: "job",
      possibleValues: [
        "webdev",
        "javadev",
        "manual tester",
        "automatic tester",
        "cppdev",
        "pythondev",
      ],
    },
    {
      key: "hobby",
      possibleValues: ["volley", "biliard", "football", "basket", "hokey"],
    },
    {
      key: DataCreationDate.hidden,
      possibleValues: [
        "07-03-2021",
        "08-02-2021",
        "02-04-2021",
        "04-12-2020",
        "09-25-2022",
        "06-30-2022",
        "05-22-2022",
        "06-11-2022",
        "06-10-2022",
        "07-21-2022",
        "02-04-2022",
      ],
    },
  ],
  car: [
    {
      key: "color",
      possibleValues: ["green", "yellow", "orange", "black", "white"],
    },
    {
      key: "model",
      possibleValues: ["VW", "Mercedes", "BMW", "Opel", "Kia"],
    },
    {
      key: "numberOfDoors",
      possibleValues: [2, 4],
    },
    {
      key: "motor",
      possibleValues: [2.4, 1.6, 1.2, 1.4, 2],
    },
    {
      key: "HP",
      possibleValues: [80, 100, 200, 300, 120, 320],
    },
    {
      key: DataCreationDate.hidden,
      possibleValues: [
        "07-03-2021",
        "08-02-2021",
        "02-04-2021",
        "04-12-2020",
        "09-25-2022",
        "06-30-2022",
        "05-22-2022",
        "06-11-2022",
        "06-10-2022",
        "07-21-2022",
        "02-04-2022",
      ],
    },
  ],
  employee: [
    {
      key: "name",
      possibleValues: [
        "user1",
        "user2",
        "user3",
        "user4",
        "user5",
        "user6",
        "user7",
      ],
    },
    {
      key: "status",
      possibleValues: ["online", "no signal", "offline"],
    },
    {
      key: "currentProject",
      possibleValues: ["web", "server", "android"],
    },
    {
      key: DataCreationDate.hidden,
      possibleValues: [
        "07-03-2021",
        "08-02-2021",
        "02-04-2021",
        "04-12-2020",
        "09-25-2022",
        "06-30-2022",
        "05-22-2022",
        "06-11-2022",
        "06-10-2022",
        "07-21-2022",
        "02-04-2022",
      ],
    },
  ],
};

export { RANDOM_DATA, DataCreationDate };
