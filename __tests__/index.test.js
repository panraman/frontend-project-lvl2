import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

const file1Json = getFixturePath('file1.json');
const file2json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');
const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');

test('check gendiff with json', () => {
  expect(genDiff(file1Json, file2json)).toEqual(readFile('compareFiles.txt'));
});

test('check gendiff with yml', () => {
  expect(genDiff(file1Yml, file2Yml)).toEqual(readFile('compareFiles.txt'));
});

test('check gendiff -f plain', () => {
  expect(genDiff(file1Yml, file2Yml, 'plain')).toEqual(readFile('comparePlain.txt'));
});

test('check gendiff -f json', () => {
  expect(genDiff(json1, json2, 'json')).toEqual(readFile('compareFiles.json'));
});
