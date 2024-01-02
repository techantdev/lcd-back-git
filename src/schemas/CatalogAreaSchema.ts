import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogAreaSchema = object({
  ...partitionKeysSchema,
  catalogAreaId: string().required(),
  schoolId: string().required(),
  catalogAreaName: string().required()
});

export default catalogAreaSchema;
