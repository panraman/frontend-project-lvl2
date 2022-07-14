/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');
const fullFile = getFixturePath('file1.json');
const emptyFile = getFixturePath('emptyFile.json');

test('format get test', () => {
  expect(genDiff(fullFile, emptyFile)).toEqual(readFile('file1_emptyFile.txt'));
  expect(genDiff(emptyFile, fullFile)).toEqual(readFile('emptyFile_file1.txt'));
  expect(genDiff(fullFile, fullFile)).toEqual(readFile('file1_file1.txt'));
});

console.log(typeof genDiff(fullFile, emptyFile));
console.log(typeof readFile('file1_emptyFile.txt'));
