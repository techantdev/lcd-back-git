import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const schoolSchema = object({
  ...partitionKeysSchema,
  schoolId: string().required(),
  schoolName: string().required()
});

export default schoolSchema;
