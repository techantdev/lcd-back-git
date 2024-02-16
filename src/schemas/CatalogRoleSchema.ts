import { InferType, object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGROLE = 'CATALOGROLE';
const SCHOOL = 'SCHOOL';

const catalogRoleSchemaRaw = object({
  catalogRoleId: string().required(),
  catalogRoleName: string().required(),
  schoolId: string().required()
});

const catalogRoleSchemaDB = catalogRoleSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGROLE),
    GSI1PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGROLE}_${ulidRegexStr}`))
  })
);

interface CatalogRoleRaw extends InferType<typeof catalogRoleSchemaRaw> {}
interface CatalogRoleDB extends InferType<typeof catalogRoleSchemaDB> {}

export { CATALOGROLE, SCHOOL, CatalogRoleRaw, CatalogRoleDB, catalogRoleSchemaRaw, catalogRoleSchemaDB };
