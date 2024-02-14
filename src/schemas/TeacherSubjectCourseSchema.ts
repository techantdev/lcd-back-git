import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const TEACHERSUBJECTCOURSE = 'TEACHERSUBJECTCOURSE';
const TEACHER = 'TEACHER';
const ACADEMICYEAR = 'ACADEMICYEAR';

const teacherSubjectCourseSchemaRaw = object({
  teacherId: string().required(),
  academicYearId: string().required(),
  yearSubjectId: string().required(),
  courseId: string().required(),
  teacherSubjectCourseId: string().required()
});

const teacherSubjectCourseSchemaDB = teacherSubjectCourseSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(TEACHERSUBJECTCOURSE),
    GSI1PK: getGSIKeySchema(getRegex(`${TEACHER}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`))
  })
);

interface TeacherSubjectCourseRaw extends InferType<typeof teacherSubjectCourseSchemaRaw> {}
interface TeacherSubjectCourseDB extends InferType<typeof teacherSubjectCourseSchemaDB> {}

export {
  TEACHERSUBJECTCOURSE,
  TEACHER,
  ACADEMICYEAR,
  TeacherSubjectCourseRaw,
  TeacherSubjectCourseDB,
  teacherSubjectCourseSchemaRaw,
  teacherSubjectCourseSchemaDB
};
