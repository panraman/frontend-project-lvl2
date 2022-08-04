import _ from 'lodash';

const stringify = (data, depth, space) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const signSpace = space.repeat(depth + 1);
  const bracketIndent = space.repeat(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${signSpace}${key}: ${stringify(value, depth + 1, space)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const signes = {
  plus: '+',
  minus: '-',
  emptiness: ' ',
};

const makeTree = (object) => {
  const space = '    ';
  const iter = (tree, depth) => tree.map((item) => {
    const currentSpace = space.repeat(depth);
    const signSpace = currentSpace.slice(2);

    const buildObject = (value, sign) => `${signSpace}${sign} ${item.key}: ${stringify(value, depth, space)}`;

    switch (item.status) {
      case 'addFirst':
        return buildObject(item.value, signes.minus);
      case 'addSecond':
        return buildObject(item.value, signes.plus);
      case 'equal':
        return buildObject(item.value, signes.emptiness);
      case 'addBoth':
        return [buildObject(item.value1, signes.minus), buildObject(item.value2, signes.plus)].join('\n');
      default:
        return `${currentSpace}${item.key}: ${['{', ...iter(item.value, depth + 1), `${currentSpace}}`].join('\n')}`;
    }
  });
  const result = iter(object, 1);
  return ['{', ...result, '}'].join('\n');
};

export default makeTree;
