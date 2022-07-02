#!/usr/bin/env node
import genDiff from '../src/index.js';
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option("-f, --format <type>", "output format")
  .action(genDiff)
  .parse();
  