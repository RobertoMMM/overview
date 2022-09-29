type KeysPossibleValues = Date | number | string | object;

type ObjectData = {
  [key: string | number]: KeysPossibleValues;
};

export { KeysPossibleValues, ObjectData };
