import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const TEACHER = 'TEACHER';
const SCHOOL = 'SCHOOL';

const teacherSchema = object({
  ...getPartitionKeysSchema(TEACHER),
  GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${TEACHER}_${ulidRegexStr}`)),
  teacherId: string().required(),
  userId: string().required(),
  schoolId: string().required(),
  teacherName: string().required(),
  teacherLastName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT teacherAssignedCatalogAreas
});

interface TeacherInterface extends InferType<typeof teacherSchema> {}

export { TEACHER, SCHOOL, TeacherInterface };

export default teacherSchema;
