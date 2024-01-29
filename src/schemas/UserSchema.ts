import { object, string, InferType, array } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, getRegex, emailRegexStr } from './schemaUtils';

const USER = 'USER';
const USEREMAIL = 'USEREMAIL';

const userSchemaRaw = object({
  userId: string().required(),
  teacherId: string().default(''),
  userName: string().default(''),
  userLastName: string().default(''),
  userEmail: string().email().required(),
  userSchools: array()
    .of(
      object({
        schoolId: string().required(),
        catalogRoles: array()
          .of(object({ catalogRoleId: string().required() }))
          .required()
      })
    )
    .required()
});

const userSchemaDB = userSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(USER),
    GSI1PK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`))
  })
);

interface UserRaw extends InferType<typeof userSchemaRaw> {}
interface UserDB extends InferType<typeof userSchemaDB> {}

export { USER, USEREMAIL, UserRaw, UserDB, userSchemaRaw, userSchemaDB };
