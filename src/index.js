import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compare from './compare.js';
import parser from './parsers.js';

const genDiff = (file1, file2) => {
  const findFile = (file) => readFileSync(path.resolve(cwd(), '__fixtures__/', file), 'utf-8');

  const getFormat = (file) => path.extname(file);

  let readFile1;
  let readFile2;

  if (getFormat(file1) === '.json') {
    readFile1 = parser('.json', findFile(file1));
  }
  if (getFormat(file1) === '.json') {
    readFile2 = parser('.json', findFile(file2));
  }
  if (getFormat(file1) === '.yml' || getFormat(file1) === '.yaml') {
    readFile1 = parser('.yml', findFile(file1));
  }
  if (getFormat(file1) === '.yml' || getFormat(file1) === '.yaml') {
    readFile2 = parser('.yml', findFile(file2));
  }
  return `{\n${compare(readFile1, readFile2)}}`;
};

export default genDiff;
