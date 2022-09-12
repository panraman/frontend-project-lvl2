import _ from 'lodash';

const valueEditor = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  } if (_.isObject(value)) {
    return '[complex value]';
  } return value;
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
    const keyName = [];
    if (key) {
      keyName.push(key);
    } if (item.status === 'object') {
      keyName.push(item.key);
      const fullKey = keyName.join('.');
      return iter(item.value, fullKey);
    }
    const Makename = (arr) => (arr[0] ? `${keyName}.${item.key}` : `${item.key}`);
    const name = Makename(keyName);
    const string = constructor(item, name);
    if (string !== 'error') {
      result.push(string);
    } return result;
  });

  iter(data);
  return result.join('\n');
};

export default plain;