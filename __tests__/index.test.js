import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');
const fullFileJson = getFixturePath('file1.json');
const emptyFileJson = getFixturePath('emptyFile.json');

test('check gendiff with json', () => {
  expect(genDiff(fullFileJson, emptyFileJson)).toEqual(readFile('file1_emptyFile.txt'));
  expect(genDiff(emptyFileJson, fullFileJson)).toEqual(readFile('emptyFile_file1.txt'));
  expect(genDiff(fullFileJson, fullFileJson)).toEqual(readFile('file1_file1.txt'));
});

const fullFileYml = getFixturePath('file1.yml');
const emptyFileYml = getFixturePath('emptyFile.yml');

test('check gendiff with yaml', () => {
  expect(genDiff(fullFileYml, emptyFileYml)).toEqual(readFile('file1_emptyFile.txt'));
  expect(genDiff(emptyFileYml, fullFileYml)).toEqual(readFile('emptyFile_file1.txt'));
  expect(genDiff(fullFileYml, fullFileYml)).toEqual(readFile('file1_file1.txt'));
});
