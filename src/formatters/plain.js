import _ from 'lodash';

const valueEditor = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return 'null';
  } if (_.isObject(value)) {
    return '[complex value]';
  } return value.toString();
};

const constructor = (value, keyName) => {
  switch (value.status) {
    case 'addFirst':
      return `Property '${keyName}' was removed`;
    case 'addSecond':
      return `Property '${keyName}' was added with value: ${valueEditor(value.value)}`;
    case 'addBoth':
      return `Property '${keyName}' was updated. From ${valueEditor(value.value1)} to ${valueEditor(value.value2)}`;
    default: return 'error';
  }
};

const plain = (data) => {
  const result = [];

  const iter = (tree, key) => tree.map((item) => {
    const path = [key];
    if (item.status === 'object') {
      const fullKey = [...path, item.key];
      return iter(item.value, fullKey.join('.'));
    }
    const makename = (arr) => (arr[0] ? `${path}.${item.key}`.slice(1) : `${item.key}`);
    const name = makename(path);
    const string = constructor(item, name);
    if (string !== 'error') {
      result.push(string);
    } return result;
  });

  iter(data);
  return result.join('\n');
};

export default plain;
