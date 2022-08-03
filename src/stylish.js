import _ from 'lodash';
import compare from './compare.js';

const stylish = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  return allSortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const comparedValues = compare(value1, value2);

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'object', value: stylish(value1, value2) };
    } if (comparedValues === 'firstValue') {
      return { key, status: 'addFirst', value: value1 };
    } if (comparedValues === 'secondValue') {
      return { key, status: 'addSecond', value: value2 };
    } if (comparedValues === 'equal') {
      return { key, status: 'equal', value: value1 };
    }
    return {
      key, status: 'addBoth', value1, value2,
    };
  });
};

export default stylish;
