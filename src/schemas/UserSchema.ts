import { object, string, InferType, array } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, getRegex, emailRegexStr, ulidRegexStr } from './schemaUtils';

const USER = 'USER';
const USEREMAIL = 'USEREMAIL';
const SCHOOL = 'SCHOOL';

const catalogRolesSchema = array()
  .of(object({ catalogRoleId: string().required() }))
  .required();

const userSchemaRaw = object({
  userId: string().required(),
  teacherId: string().default(''),
  userName: string().default(''),
  userLastName: string().default(''),
  userEmail: string().email().required(),
  catalogRoles: catalogRolesSchema,
  schoolId: string().required()
});

const userSchemaDB = userSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(USER),
    GSI1PK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`)),
    GSI2PK: getGSIKeySchema(getRegex(`${SCHOOL}_${ulidRegexStr}`)),
    GSI2SK: getGSIKeySchema(getRegex(`${USER}_${ulidRegexStr}`))
  })
);

interface UserRaw extends InferType<typeof userSchemaRaw> {}
interface UserDB extends InferType<typeof userSchemaDB> {}
interface CatalogRoles extends InferType<typeof catalogRolesSchema> {}
export { USER, USEREMAIL, SCHOOL, UserRaw, UserDB, userSchemaRaw, userSchemaDB, CatalogRoles };
