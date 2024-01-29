import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGAREA = 'CATALOGAREA';
const SCHOOL = 'SCHOOL';

const catalogAreaSchemaRaw = object({
  catalogAreaId: string().required(),
  schoolId: string().required(),
  catalogAreaName: string().required()
});

const catalogAreaSchemaDB = catalogAreaSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGAREA),
    GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGAREA}_${ulidRegexStr}`))
  })
);

interface CatalogAreaRaw extends InferType<typeof catalogAreaSchemaRaw> {}
interface CatalogAreaDB extends InferType<typeof catalogAreaSchemaDB> {}

export { CATALOGAREA, SCHOOL, CatalogAreaRaw, CatalogAreaDB, catalogAreaSchemaRaw, catalogAreaSchemaDB };
