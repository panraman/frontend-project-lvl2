import yaml from 'js-yaml';

const parser = (format, filePath) => {
  let result;
  if (format === '.json') {
    result = JSON.parse(filePath);
  } if (format === '.yml') {
    result = yaml.load(filePath);
  }
  return result;
};

export default parser;
