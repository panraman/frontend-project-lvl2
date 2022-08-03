import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', 'fortest', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');
const full1json = getFixturePath('full1.json');
const full2json = getFixturePath('full2.json');
const emptyFileJson = getFixturePath('empty.json');

test('check gendiff with json', () => {
  expect(genDiff(full1json, emptyFileJson)).toEqual(readFile('compare1_0.txt'));
  expect(genDiff(emptyFileJson, full1json)).toEqual(readFile('compare0_1.txt'));
  expect(genDiff(full1json, full2json)).toEqual(readFile('compare1_2.txt'));
  expect(genDiff(full1json, full1json)).toEqual(readFile('compare1_1.txt'));
});

const full1yml = getFixturePath('full1.yml');
const full2jyml = getFixturePath('full2.yml');
const emptyFileyml = getFixturePath('empty.yml');

test('check gendiff with yml', () => {
  expect(genDiff(full1yml, emptyFileyml)).toEqual(readFile('compare1_0.txt'));
  expect(genDiff(emptyFileyml, full1yml)).toEqual(readFile('compare0_1.txt'));
  expect(genDiff(full1yml, full2jyml)).toEqual(readFile('compare1_2.txt'));
  expect(genDiff(full1yml, full1yml)).toEqual(readFile('compare1_1.txt'));
});
