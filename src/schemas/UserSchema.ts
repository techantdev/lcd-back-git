import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const USER = 'USER';
const USEREMAIL = 'USEREMAIL';
const userSchema = object({
  ...getPartitionKeysSchema(USER),
  GSI1PK: getGSIKeySchema(getRegex(`${USEREMAIL}_${ulidRegexStr}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${USEREMAIL}_${ulidRegexStr}`)),
  userId: string().required(),
  teacherId: string().required(),
  userName: string().required(),
  userLastName: string().required(),
  userEmail: string().email().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT userUSEREMAILs
});

interface UserInterface extends InferType<typeof userSchema> {}

export { USER, USEREMAIL, UserInterface };

export default userSchema;
