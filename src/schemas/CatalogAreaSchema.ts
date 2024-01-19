import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGAREA = 'CATALOGAREA';
const SCHOOL = 'SCHOOL';

const catalogAreaSchema = object({
  ...getPartitionKeysSchema(CATALOGAREA),
  GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGAREA}_${ulidRegexStr}`)),
  catalogAreaId: string().required(),
  schoolId: string().required(),
  catalogAreaName: string().required()
});

interface CatalogAreaInterface extends InferType<typeof catalogAreaSchema> {}


export { CATALOGAREA, SCHOOL, CatalogAreaInterface };

export default catalogAreaSchema;
