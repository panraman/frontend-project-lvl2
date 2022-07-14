import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compare from './compare.js';

const getFormat = (filePath) => {
  const arrayPath = filePath.split('.');
  const extension = arrayPath.slice(-1);

  return extension[0];
};

const workWithJson = (filePath) => {
  const currentPath = cwd();
  const findFile = readFileSync(path.resolve(currentPath, '__fixtures__/', filePath), 'utf-8');
  const readFile = JSON.parse(findFile);
  return readFile;
};

const genDiff = (file1, file2) => {
  const formatOfFirst = getFormat(file1);
  const formatOfStcond = getFormat(file1);

  let readFile1;
  let readFile2;

  if (formatOfFirst === 'json') {
    readFile1 = workWithJson(file1);
  }
  if (formatOfStcond === 'json') {
    readFile2 = workWithJson(file2);
  }

  return `{\n${compare(readFile1, readFile2)}}`;
};

export default genDiff;
