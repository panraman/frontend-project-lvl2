import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';


// функция определения формата
const getFormat = (filePath) => {
  const arrayPath = filePath.split('.')
  const extension = arrayPath.slice(-1);

  return extension[0];
};

const compareKeys = (obj1, obj2) => {
  const keys = Object.keys(obj1);
  for (const key in obj2) {
    keys.push(key);
  } 
  const uniqeKeys = _.sortBy(_.uniq(keys));
  const result = uniqeKeys.reduce((acc, key) => {
    const firstValue = obj1[key];
    const secondValue = obj2[key];

    if (firstValue === secondValue) {
      acc = acc + `    ${key}: ${secondValue}\n`;
      return acc;
    }
    if (firstValue === undefined) {
      acc = acc + `  + ${key}: ${secondValue}\n`;
      return acc;
    }
    if (secondValue === undefined) {
      acc = acc + `  - ${key}: ${firstValue}\n`;
      return acc;
    } else {
      acc = acc + `  - ${key}: ${firstValue}\n`;
      acc = acc + `  + ${key}: ${secondValue}\n`;
    }
    return acc;
  }, "")
  return result;
}

const workWithJson = (filePath) => {
  const currentPath  = process.cwd();
  const findFile = readFileSync(currentPath + '/src/test_files/' + filePath);
  const readFile = JSON.parse(findFile);
  return readFile;
}

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

  console.log(`{\n${compareKeys(readFile1, readFile2)}}`);
};

export default genDiff;