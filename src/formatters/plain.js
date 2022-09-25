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
    let path = '';
    if (key) {
      path += key;
    } if (item.status === 'object') {
      if (path === '') {
        path += item.key;
      } else path += ` ${item.key}`;
      const newPath = path.split(' ');
      const fullKey = newPath.join('.');
      return iter(item.value, fullKey);
    }
    const makename = (arr) => (arr[0] ? `${path}.${item.key}` : `${item.key}`);
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
