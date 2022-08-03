import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import stylish from './stylish.js';
import parser from './parsers.js';
import makeTree from './formatter.js';

const genDiff = (file1, file2) => {
  const fileContent = (file) => readFileSync(path.resolve(cwd(), '__fixtures__/', file), 'utf-8');

  const readFile1 = parser(fileContent(file1), file1);
  const readFile2 = parser(fileContent(file2), file2);

  const result = stylish(readFile1, readFile2);
  return makeTree(result);
};

export default genDiff;
