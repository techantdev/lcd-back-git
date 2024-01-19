import { object, string, InferType } from 'yup';
import { getRegex, partitionKeysSchema, getGSIKeySchema, ulidRegexStr } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const COURSE = 'COURSE';
const TEACHER = 'TEACHER';

const courseSchema = object({
  ...partitionKeysSchema,
  GSI1PK: getGSIKeySchema(getRegex(`${YEARGRADE}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${COURSE}_${ulidRegexStr}`)),
  GSI2PK: getGSIKeySchema(getRegex(`${TEACHER}_${ulidRegexStr}`)),
  GSI2SK: getGSIKeySchema(getRegex(`${COURSE}_${ulidRegexStr}`)),
  courseId: string().required(),
  teacherId: string().required(),
  yearGradeId: string().required(),
  trackerId: string().required(),
  courseLabel: string().required()
});

interface CourseInterface extends InferType<typeof courseSchema> {}

export { YEARGRADE, COURSE , TEACHER, CourseInterface };

export default courseSchema;
