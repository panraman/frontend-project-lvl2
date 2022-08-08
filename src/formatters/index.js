import makeTree from './stylish.js';
import plain from './plain.js';
import makeJson from './json.js';

const formatter = (data, format) => {
  let result;
  if (format === 'stylish') {
    result = makeTree(data);
  } if (format === 'plain') {
    result = plain(data);
  } if (format === 'json') {
    result = makeJson(data);
  } return result;
};

export default formatter;
