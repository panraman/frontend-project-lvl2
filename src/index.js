import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareValues from './compareValues.js';
import parser from './parsers.js';
import formater from './formater.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const fileContent = (file) => readFileSync(path.resolve(cwd(), '__fixtures__/', file), 'utf-8');

  const readFile1 = parser(fileContent(file1), file1);
  const readFile2 = parser(fileContent(file2), file2);

  const result = compareValues(readFile1, readFile2);
  return formater(result, format);
};

export default genDiff;
