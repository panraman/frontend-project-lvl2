import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareValues from './compareValues.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(cwd(), file);
const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = parser(readFileSync(getAbsolutePath(filePath1), 'utf-8'), getFormat(filePath1)); // не слишком длинный и неразборчивый код так получается?
  const file2 = parser(readFileSync(getAbsolutePath(filePath2), 'utf-8'), getFormat(filePath2)); // или я не совсем правильно понял как readContent поместить в гендиф?
  const result = compareValues(file1, file2);

  return formatter(result, format);
};

export default genDiff;
