import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARSUBJECTCOURSE = 'YEARSUBJECTCOURSE';
const TEACHER = 'TEACHER';
const ACADEMICYEAR = 'ACADEMICYEAR';
const YEARSUBJECT = 'YEARSUBJECT';
const COURSE = 'COURSE';

const yearSubjectCourseSchemaRaw = object({
  teacherId: string().required(),
  academicYearId: string().required(),
  yearSubjectId: string().required(),
  courseId: string().required(),
  yearSubjectCourseId: string().required()
});

const yearSubjectCourseSchemaDB = yearSubjectCourseSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(YEARSUBJECTCOURSE),
    GSI1PK: getGSIKeySchema(getRegex(`${TEACHER}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
    GSI2PK: getGSIKeySchema(getRegex(`${YEARSUBJECT}_${ulidRegexStr}`)),
    GSI2SK: getGSIKeySchema(getRegex(`${COURSE}_${ulidRegexStr}`))
  })
);

interface YearSubjectCourseRaw extends InferType<typeof yearSubjectCourseSchemaRaw> {}
interface YearSubjectCourseDB extends InferType<typeof yearSubjectCourseSchemaDB> {}

export {
  YEARSUBJECTCOURSE,
  TEACHER,
  ACADEMICYEAR,
  YEARSUBJECT,
  COURSE,
  YearSubjectCourseRaw,
  YearSubjectCourseDB,
  yearSubjectCourseSchemaRaw,
  yearSubjectCourseSchemaDB
};
