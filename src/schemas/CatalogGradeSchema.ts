import { object, string } from 'yup';
import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGGRADE = 'CATALOGGRADE_';
const SCHOOL = 'SCHOOL';

const catalogGradeSchema = object({
  ...getPartitionKeysSchema(CATALOGGRADE),
  ...getGSIKeysSchema(1, getRegex(`${SCHOOL}_${ulidRegexStr}`), getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogGradeId: string().required(),
  schoolId: string().required(),
  catalogGradeLabel: string().required()
});

export { CATALOGGRADE, SCHOOL };

export default catalogGradeSchema;
