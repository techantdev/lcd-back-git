import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const yearGradeSchema = object({
  ...partitionKeysSchema,
  yearGradeId: string().required(),
  academicYearId: string().required(),
  catalogGradeId: string().required()
});

export default yearGradeSchema;
