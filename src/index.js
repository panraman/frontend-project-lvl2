import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareValues from './compareValues.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(cwd(), file);
const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const readedFile1 = readFileSync(getAbsolutePath(filePath1), 'utf-8');
  const readedFile2 = readFileSync(getAbsolutePath(filePath2), 'utf-8');
  const format1 = getFormat(filePath1);
  const format2 = getFormat(filePath2);

  const file1 = parser(readedFile1, format1);
  const file2 = parser(readedFile2, format2);
  const result = compareValues(file1, file2);

  return formatter(result, format);
};

export default genDiff;
