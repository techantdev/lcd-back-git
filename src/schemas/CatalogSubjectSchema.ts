import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogSubjectSchema = object({
  ...partitionKeysSchema,
  catalogSubjectId: string().required(),
  catalogAreaId: string().required(),
  catalogSubjectName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT catalogSubjectGrades
});

export default catalogSubjectSchema;
