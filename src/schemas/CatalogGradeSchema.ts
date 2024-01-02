import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogGradeSchema = object({
  ...partitionKeysSchema,
  catalogGradeId: string().required(),
  schoolId: string().required(),
  catalogGradeLabel: string().required()
});

export default catalogGradeSchema;
