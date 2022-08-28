import yaml from 'js-yaml';

const parser = (fileContent, fileName) => {
  let result;
  if (fileName === 'json') {
    result = JSON.parse(fileContent);
  } if (fileName === 'yml' || fileName === 'yaml') {
    result = yaml.load(fileContent);
  }
  return result;
};

export default parser;
