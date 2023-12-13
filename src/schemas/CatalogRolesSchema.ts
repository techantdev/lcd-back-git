import { object, string } from 'yup';

const catalogRolesSchema = object({
  catalogRoleId: string().required(),
  catalogRoleName: string().required()
});

export default catalogRolesSchema;
