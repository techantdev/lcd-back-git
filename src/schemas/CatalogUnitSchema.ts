import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGUNIT = 'CATALOGUNIT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogUnitSchema = object({
  ...getPartitionKeysSchema(CATALOGUNIT),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGUNIT}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogUnitId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogUnitName: string().required()
});

interface CatalogUnitface extends InferType<typeof catalogUnitSchema> {}

export { CATALOGUNIT , CATALOGSUBJECT , CATALOGGRADE, CatalogUnitface };

export default catalogUnitSchema;
