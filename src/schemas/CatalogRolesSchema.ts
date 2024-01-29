import { InferType, object, string } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const CATALOGROLES = 'CATALOGROLES';

const catalogRolesSchemaRaw = object({
  catalogRoleId: string().required(),
  catalogRoleName: string().required()
});

const catalogRolesSchemaDB = catalogRolesSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGROLES)
  })
);

interface CatalogRolesRaw extends InferType<typeof catalogRolesSchemaRaw> {}
interface CatalogRolesDB extends InferType<typeof catalogRolesSchemaDB> {}

export { CATALOGROLES, CatalogRolesRaw, CatalogRolesDB, catalogRolesSchemaRaw, catalogRolesSchemaDB };
