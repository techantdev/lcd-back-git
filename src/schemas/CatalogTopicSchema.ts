import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGTOPIC = 'CATALOGTOPIC';
const CATALOGUNIT = 'CATALOGUNIT';

const catalogTopicSchemaRaw = object({
  catalogTopicId: string().required(),
  catalogUnitId: string().required(),
  catalogTopicName: string().required()
});

const catalogTopicSchemaDB = catalogTopicSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGTOPIC),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGUNIT}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`))
  })
);

interface CatalogTopicRaw extends InferType<typeof catalogTopicSchemaRaw> {}
interface CatalogTopicDB extends InferType<typeof catalogTopicSchemaDB> {}

export { CATALOGTOPIC, CATALOGUNIT, CatalogTopicRaw, CatalogTopicDB, catalogTopicSchemaRaw, catalogTopicSchemaDB };
