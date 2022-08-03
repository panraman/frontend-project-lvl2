import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');
const full1json = getFixturePath('full1.json');
const full2json = getFixturePath('full2.json');
const emptyFileJson = getFixturePath('emptyFile.json');

test('check gendiff with json', () => {
  expect(genDiff(full1json, emptyFileJson)).toEqual(readFile('compaer1_0.txt'));
  expect(genDiff(emptyFileJson, full1json)).toEqual(readFile('compaer0_1.txt'));
  expect(genDiff(full1json, full2json)).toEqual(readFile('compaer1_2.txt'));
  expect(genDiff(full1json, full1json)).toEqual(readFile('compaer1_1.txt'));
});

// тут проверка для yaml в будущем
