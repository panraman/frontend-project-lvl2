import yaml from 'js-yaml';

const parser = (fileContent, fileName) => {
  switch (fileName) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    case 'yaml':
      return yaml.load(fileContent);
    default:
      return 'error';
  }
};

export default parser;
