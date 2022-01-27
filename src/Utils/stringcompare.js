export const stringCompare = (string2, string1, comparingField) => {
  if (
    string2[comparingField].trim().toLowerCase() <
    string1[comparingField].trim().toLowerCase()
  ) {
    return -1; // swap
  }
  return 1; // positions stay same
};

export const sorterFunc = (comparingField) => {
  return (item2, item1) => {
    return stringCompare(item2, item1, comparingField);
  };
};
