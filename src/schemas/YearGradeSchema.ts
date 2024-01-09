import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearGradeSchema = object({
  ...getPartitionKeysSchema(YEARGRADE),
  ...getGSIKeysSchema(1, getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`), getRegex(`${YEARGRADE}_${ulidRegexStr}`)),
  yearGradeId: string().required(),
  academicYearId: string().required(),
  catalogGradeId: string().required()
});

export { YEARGRADE, ACADEMICYEAR };

export default yearGradeSchema;
