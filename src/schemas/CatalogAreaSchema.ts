import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGAREA = 'CATALOGAREA';
const SCHOOL = 'SCHOOL';

const catalogAreaSchema = object({
  ...getPartitionKeysSchema(CATALOGAREA),
  ...getGSIKeysSchema(1, getRegex(`${SCHOOL}_${ulidRegexStr}`), getRegex(`${CATALOGAREA}_${ulidRegexStr}`)),
  catalogAreaId: string().required(),
  schoolId: string().required(),
  catalogAreaName: string().required()
});

export { CATALOGAREA, SCHOOL };

export default catalogAreaSchema;
