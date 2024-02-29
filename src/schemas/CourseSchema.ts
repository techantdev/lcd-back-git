import { object, string, InferType } from 'yup';
import { getRegex, partitionKeysSchema, getGSIKeySchema, ulidRegexStr } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const COURSE = 'COURSE';
const TEACHER = 'TEACHER';

const courseSchemaRaw = object({
  courseId: string().required(),
  yearGradeId: string().required(),
  courseLabel: string().required()
});

const courseSchemaDB = courseSchemaRaw.concat(
  object({
    ...partitionKeysSchema,
    GSI1PK: getGSIKeySchema(getRegex(`${YEARGRADE}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${COURSE}_${ulidRegexStr}`))
  })
);

interface CourseRaw extends InferType<typeof courseSchemaRaw> {}
interface CourseDB extends InferType<typeof courseSchemaDB> {}

export { YEARGRADE, COURSE, TEACHER, CourseRaw, CourseDB, courseSchemaRaw, courseSchemaDB };
