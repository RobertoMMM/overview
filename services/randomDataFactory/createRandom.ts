import { KeysPossibleValues, ObjectData } from "../types";

interface RandomDataStructure {
  key: string;
  possibleValues: KeysPossibleValues[];
}

const getRandomElement = (dataArray: KeysPossibleValues[]) => {
  const randomIndex = Math.floor(Math.random() * dataArray.length);

  return dataArray[randomIndex];
};

const createObjectKeysWithRandomData = (
  randomData: RandomDataStructure[]
): ObjectData => {
  const storedObj: ObjectData = {};

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
  const storedData: ObjectData[] = [];

  for (let i = 0; i < amount; i++) {
    const random = createObjectKeysWithRandomData(randomData);

    storedData.push(random);
  }

  return storedData;
};

export { createRandomData };
