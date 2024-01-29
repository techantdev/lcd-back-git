import { object, string, InferType } from 'yup';
import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGGRADE = 'CATALOGGRADE_';
const SCHOOL = 'SCHOOL';

const catalogGradeSchemaRaw = object({
  catalogGradeId: string().required(),
  schoolId: string().required(),
  catalogGradeLabel: string().required()
});

const catalogGradeSchemaDB = catalogGradeSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGGRADE),
    GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface CatalogGradeRaw extends InferType<typeof catalogGradeSchemaRaw> {}
interface CatalogGradeDB extends InferType<typeof catalogGradeSchemaDB> {}

export { CATALOGGRADE, SCHOOL, CatalogGradeRaw, CatalogGradeDB, catalogGradeSchemaRaw, catalogGradeSchemaDB };
