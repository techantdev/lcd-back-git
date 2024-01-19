import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARGRADE = 'YEARGRADE';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearGradeSchema = object({
  ...getPartitionKeysSchema(YEARGRADE),
  GSI1PK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${YEARGRADE}_${ulidRegexStr}`)),
  yearGradeId: string().required(),
  academicYearId: string().required(),
  catalogGradeId: string().required()
});

interface YearGradeInterface extends InferType<typeof yearGradeSchema> {}

export { YEARGRADE, ACADEMICYEAR, YearGradeInterface };

export default yearGradeSchema;
