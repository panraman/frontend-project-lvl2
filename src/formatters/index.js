import makeTree from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const formatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeTree(data);
    case 'plain':
      return plain(data);
    case 'json':
      return makeJson(data);
    default:
      return 'error';
  }
};

export default formatter;
