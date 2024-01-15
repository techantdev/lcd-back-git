import { string } from 'yup';

const partitionKeysSchema = {
  PK: string().required(),
  SK: string().required()
};

const getPartitionKeysSchema = (entityKey: String) => {
  const regexStr = `${entityKey}_[0-9A-HJKMNP-Z]{26}`;
  const regex = new RegExp(regexStr, 'g');
  return {
    PK: string().matches(regex).required(),
    SK: string().matches(regex).required()
  };
};

const getGSIKeySchema = (regex: RegExp) => string().matches(regex).required();

const getGSIKeysSchema = (index: Number, PKRegex: RegExp, SKRegex: RegExp) => {
  return {
    [`GSI${index}PK`]: getGSIKeySchema(PKRegex),
    [`GSI${index}SK`]: getGSIKeySchema(SKRegex)
  };
};

const ulidRegexStr = '[0-9A-HJKMNP-Z]{26}';

const getRegex = (expression: string) => new RegExp(expression, 'g');

export { partitionKeysSchema, getPartitionKeysSchema, getGSIKeySchema, getGSIKeysSchema, ulidRegexStr, getRegex };
