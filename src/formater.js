import makeTree from './stylish.js';

const formater = (data, format) => {
  let result;
  if (format === 'stylish') {
    result = makeTree(data);
  }
  return result;
};

export default formater;
