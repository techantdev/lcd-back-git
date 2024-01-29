import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGUNIT = 'CATALOGUNIT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogUnitSchemaRaw = object({
  catalogUnitId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogUnitName: string().required()
});

const catalogUnitSchemaDB = catalogUnitSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGUNIT),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGUNIT}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface CatalogUnitRaw extends InferType<typeof catalogUnitSchemaRaw> {}
interface CatalogUnitDB extends InferType<typeof catalogUnitSchemaDB> {}

export { CATALOGUNIT, CATALOGSUBJECT, CATALOGGRADE, CatalogUnitRaw, CatalogUnitDB, catalogUnitSchemaRaw, catalogUnitSchemaDB };
