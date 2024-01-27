import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, getRegex, emailRegexStr } from './schemaUtils';

const USER = 'USER';
const USEREMAIL = 'USEREMAIL';
const userSchema = object({
  ...getPartitionKeysSchema(USER),
  GSI1PK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${USEREMAIL}_${emailRegexStr}`)),
  userId: string().required(),
  teacherId: string().default(''),
  userName: string().default(''),
  userLastName: string().default(''),
  userEmail: string().email().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT userUSEREMAILs
});

interface UserInterface extends InferType<typeof userSchema> {}

export { USER, USEREMAIL, UserInterface };

export default userSchema;
