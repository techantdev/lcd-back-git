import { number, object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const ACADEMICYEAR = 'ACADEMICYEAR';
const SCHOOL = 'SCHOOL';

const academicYearSchema = object({
  ...getPartitionKeysSchema(ACADEMICYEAR),
  ...getGSIKeysSchema(1, getRegex(`${SCHOOL}_${ulidRegexStr}`), getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
  academicYearId: string().required(),
  schoolId: string().required(),
  year: number().required().positive()
});

export { ACADEMICYEAR, SCHOOL };

export default academicYearSchema;
