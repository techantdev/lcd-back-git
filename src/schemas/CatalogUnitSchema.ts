import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogUnitSchema = object({
  ...partitionKeysSchema,
  catalogUnitId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogUnitName: string().required()
});

export default catalogUnitSchema;
