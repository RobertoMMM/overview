import { KeysPossibleValues } from "../types";

interface RandomDataStructure {
  key: string;
  possibleValues: KeysPossibleValues[];
}

interface DataStructure {
  [key: string]: KeysPossibleValues;
}

const getRandomElement = (dataArray: KeysPossibleValues[]) => {
  const randomIndex = Math.floor(Math.random() * dataArray.length);

  return dataArray[randomIndex];
};

const createObjectKeysWithRandomData = (
  randomData: RandomDataStructure[]
): DataStructure => {
  const storedObj: DataStructure = {};

  for (const { key, possibleValues } of randomData) {
    const data = getRandomElement(possibleValues);

    storedObj[key] = data;
  }

  return storedObj;
};

const createRandomData = (
  randomData: RandomDataStructure[],
  amount: number
) => {
  const storedData: DataStructure[] = [];

  for (let i = 0; i < amount; i++) {
    const random = createObjectKeysWithRandomData(randomData);

    storedData.push(random);
  }

  return storedData;
};

export { createRandomData };
