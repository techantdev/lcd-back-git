import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGUNIT = 'CATALOGUNIT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogUnitSchema = object({
  ...getPartitionKeysSchema(CATALOGUNIT),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGUNIT}`), getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogUnitId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogUnitName: string().required()
});

export { CATALOGUNIT , CATALOGSUBJECT , CATALOGGRADE };

export default catalogUnitSchema;
