import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGTOPIC = 'CATALOGTOPIC';
const CATALOGUNIT = 'CATALOGUNIT';

const catalogTopicSchema = object({
  ...getPartitionKeysSchema(CATALOGTOPIC),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGUNIT}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`)),
  catalogTopicId: string().required(),
  catalogUnitId: string().required(),
  catalogTopicName: string().required()
});

interface CatalogTopicInterface extends InferType<typeof catalogTopicSchema> {}

export { CATALOGTOPIC, CATALOGUNIT, CatalogTopicInterface };

export default catalogTopicSchema;
