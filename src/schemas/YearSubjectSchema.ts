import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogSubjectSchema = object({
  ...partitionKeysSchema,
  yearSubjectId: string().required(),
  catalogSubjectId: string().required(),
  yearAreaId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT yearSubjectGrades
});

export default catalogSubjectSchema;
