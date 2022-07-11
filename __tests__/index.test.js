/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('format get test', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('emptyFile.json'))).toBe(getFixturePath('file1_emptyFile.txt'));
});
