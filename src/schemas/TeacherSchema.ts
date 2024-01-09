import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const TEACHER = 'TEACHER';
const SCHOOL = 'SCHOOL';

const teacherSchema = object({
  ...getPartitionKeysSchema(TEACHER),
  ...getGSIKeysSchema(1, getRegex(`${SCHOOL}_${ulidRegexStr}`), getRegex(`${TEACHER}_${ulidRegexStr}`)),
  teacherId: string().required(),
  userId: string().required(),
  schoolId: string().required(),
  teacherName: string().required(),
  teacherLastName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT teacherAssignedCatalogAreas
});

export { TEACHER, SCHOOL };

export default teacherSchema;
