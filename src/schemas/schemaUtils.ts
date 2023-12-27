import { string } from 'yup';

const partitionKeysSchema = {
  PK: string().required(),
  SK: string().required()
};

export { partitionKeysSchema };
