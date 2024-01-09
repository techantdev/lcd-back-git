import { object, string } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const CATALOGROLES = 'CATALOGROLES';

const catalogRolesSchema = object({
  ...getPartitionKeysSchema(CATALOGROLES),
  catalogRoleId: string().required(),
  catalogRoleName: string().required()
});

export { CATALOGROLES };

export default catalogRolesSchema;
