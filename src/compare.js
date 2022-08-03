export default (value1, value2) => {
  if (value1 !== value2) {
    if (value1 === undefined) {
      return 'secondValue';
    } if (value2 === undefined) {
      return 'firstValue';
    } if (value1 !== undefined && value2 !== undefined) {
      return 'default';
    }
  }
  return 'equal';
};
