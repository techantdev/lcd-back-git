import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogRolesSchema = object({
  ...partitionKeysSchema,
  catalogRoleId: string().required(),
  catalogRoleName: string().required()
});

export default catalogRolesSchema;
