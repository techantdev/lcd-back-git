import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const YEARAREA = 'YEARAREA';
const ACADEMICYEAR = 'ACADEMICYEAR';

const yearAreaSchema = object({
  ...getPartitionKeysSchema(YEARAREA),
  ...getGSIKeysSchema(1, getRegex(`${ACADEMICYEAR}_${ulidRegexStr}`), getRegex(`${YEARAREA}_${ulidRegexStr}`)),
  yearAreaId: string().required(),
  catalogAreaId: string().required(),
  academicYearId: string().required()
});

export { YEARAREA, ACADEMICYEAR };

export default yearAreaSchema;
