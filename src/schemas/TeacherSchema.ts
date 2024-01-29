import { object, string, InferType, array } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const TEACHER = 'TEACHER';
const SCHOOL = 'SCHOOL';

const teacherAssignedCatalogAreasSchema = array()
  .of(object({ catalogAreaId: string().required() }))
  .required();

const teacherSchemaRaw = object({
  teacherId: string().required(),
  userId: string().required(),
  schoolId: string().required(),
  teacherName: string().required(),
  teacherLastName: string().required(),
  teacherAssignedCatalogAreas: teacherAssignedCatalogAreasSchema
});

const teacherSchemaDB = teacherSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(TEACHER),
    GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${TEACHER}_${ulidRegexStr}`))
  })
);

interface TeacherRaw extends InferType<typeof teacherSchemaRaw> {}
interface TeacherDB extends InferType<typeof teacherSchemaDB> {}

export { TEACHER, SCHOOL, TeacherRaw, TeacherDB, teacherSchemaRaw, teacherSchemaDB };
