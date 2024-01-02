import { object, string } from 'yup';
import { getRegex, partitionKeysSchema, getGSIKeysSchema, ulidRegexStr } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const COURSE = 'COURSE';
const TEACHER = 'TEACHER';

const courseSchema = object({
  ...partitionKeysSchema,
  ...getGSIKeysSchema(1, getRegex(`${YEARGRADE}_${ulidRegexStr}`), getRegex(`${COURSE}_${ulidRegexStr}`)),
  ...getGSIKeysSchema(2, getRegex(`${TEACHER}_${ulidRegexStr}`), getRegex(`${COURSE}_${ulidRegexStr}`)),
  courseId: string().required(),
  teacherId: string().required(),
  yearGradeId: string().required(),
  trackerId: string().required(),
  courseLabel: string().required()
});

export default courseSchema;
