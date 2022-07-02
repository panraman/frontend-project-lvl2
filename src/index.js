import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';



const genDiff = (file1, file2) => {
  const currentPath  = process.cwd();

  const findFile1 = readFileSync(path.resolve(currentPath, file1));
  const readFile1 = JSON.parse(findFile1);

  const findFile2 = readFileSync(path.resolve(currentPath, file2));
  const readFile2 = JSON.parse(findFile2);

  const getKeysOfBoth = (obj1, obj2) => {
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
  console.log(`{\n${getKeysOfBoth(readFile1, readFile2)}}`);
};

export default genDiff;