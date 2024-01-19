import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBTOPIC = 'CATALOGSUBTOPIC';
const CATALOGTOPIC = 'CATALOGTOPIC';

const catalogSubTopicSchema = object({
  ...getPartitionKeysSchema(CATALOGSUBTOPIC),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGSUBTOPIC}_${ulidRegexStr}`)),
  catalogSubTopicId: string().required(),
  catalogTopicId: string().required(),
  catalogSubTopicName: string().required()
});

interface CatalogSubTopicInterface extends InferType<typeof catalogSubTopicSchema> {}

export { CATALOGSUBTOPIC, CATALOGTOPIC, CatalogSubTopicInterface };

export default catalogSubTopicSchema;
