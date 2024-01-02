import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const yearAreaSchema = object({
  ...partitionKeysSchema,
  yearAreaId: string().required(),
  catalogAreaId: string().required(),
  academicYearId: string().required()
});

export default yearAreaSchema;
