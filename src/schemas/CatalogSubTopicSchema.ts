import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBTOPIC = 'CATALOGSUBTOPIC';
const CATALOGTOPIC = 'CATALOGTOPIC';

const catalogSubTopicSchemaRaw = object({
  catalogSubTopicId: string().required(),
  catalogTopicId: string().required(),
  catalogSubTopicName: string().required()
});

const catalogSubTopicSchemaDB = catalogSubTopicSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGSUBTOPIC),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGSUBTOPIC}_${ulidRegexStr}`))
  })
);

interface CatalogSubTopicRaw extends InferType<typeof catalogSubTopicSchemaRaw> {}
interface CatalogSubTopicDB extends InferType<typeof catalogSubTopicSchemaDB> {}

export { CATALOGSUBTOPIC, CATALOGTOPIC, CatalogSubTopicRaw, CatalogSubTopicDB, catalogSubTopicSchemaRaw, catalogSubTopicSchemaDB };
