import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareValues from './compareValues.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (file) => path.resolve(cwd(), file);
const getFormat = (file) => path.extname(file).slice(1);

const readContent = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const file = readFileSync(absolutePath, 'utf-8');
  const format = getFormat(filePath);
  return parser(file, format);
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readContent(filePath1);
  const file2 = readContent(filePath2);
  const result = compareValues(file1, file2);

  return formatter(result, format);
};

export default genDiff;
