/* eslint-disable no-param-reassign */
import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const uniqeKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const result = uniqeKeys.reduce((acc, key) => {
    const firstValue = obj1[key];
    const secondValue = obj2[key];

    if (firstValue === secondValue) {
      acc += `    ${key}: ${secondValue}\n`;
      return acc;
    }
    if (firstValue === undefined) {
      acc += `  + ${key}: ${secondValue}\n`;
      return acc;
    }
    if (secondValue === undefined) {
      acc += `  - ${key}: ${firstValue}\n`;
      return acc;
    }
    acc += `  - ${key}: ${firstValue}\n`;
    acc += `  + ${key}: ${secondValue}\n`;

    return acc;
  }, '');

  return result;
};
