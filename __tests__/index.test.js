/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('format get test', () => {
  const fullFile = getFixturePath('file1.json');
  const emptyFile = getFixturePath('emptyFile.json');
  expect(genDiff(fullFile, emptyFile)).toBe(getFixturePath('file1_emptyFile.txt'));
  expect(genDiff(emptyFile, fullFile)).toBe(getFixturePath('file1_emptyFile.txt'));
  expect(genDiff(fullFile, fullFile)).toBe(getFixturePath('file1_file1.txt'));
});
