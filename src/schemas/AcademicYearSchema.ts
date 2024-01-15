import { number, object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const ACADEMICYEAR = 'ACADEMICYEAR';
const SCHOOL = 'SCHOOL';

const academicYearSchema = object({
  ...getPartitionKeysSchema(ACADEMICYEAR),
  GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`)),
  academicYearId: string().required(),
  schoolId: string().required(),
  year: number().required().positive()
});

interface AcademicYearInterface extends InferType<typeof academicYearSchema> {}

export { ACADEMICYEAR, SCHOOL, AcademicYearInterface };

export default academicYearSchema;
