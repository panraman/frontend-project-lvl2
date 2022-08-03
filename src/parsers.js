import yaml from 'js-yaml';
import path from 'path';

const parser = (fileContent, fileName) => {
  const getFormat = (file) => path.extname(file);

  let result;
  if (getFormat(fileName) === '.json') {
    result = JSON.parse(fileContent);
  } if (getFormat(fileName) === '.yml') {
    result = yaml.load(fileContent);
  }
  return result;
};

export default parser;
