import makeTree from './stylish.js';
import plain from './plain.js';

const formatter = (data, format) => {
  let result;
  if (format === 'stylish') {
    result = makeTree(data);
  } if (format === 'plain') {
    result = plain(data);
  }
  return result;
};

export default formatter;
