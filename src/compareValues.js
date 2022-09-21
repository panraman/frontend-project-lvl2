import _ from 'lodash';

function compareValues(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  return allSortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'object', value: compareValues(value1, value2) };
    } if (_.isEqual(value1, value2)) {
      return { key, status: 'equal', value: value1 };
    } if (!_.has(obj2, key)) {
      return { key, status: 'addFirst', value: value1 };
    } if (!_.has(obj1, key)) {
      return { key, status: 'addSecond', value: value2 };
    }
    return {
      key, status: 'addBoth', value1, value2,
    };
  });
}

export default compareValues;
