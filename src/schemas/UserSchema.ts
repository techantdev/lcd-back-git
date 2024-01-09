import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const USER = 'USER';
const USEREMAIL = 'USEREMAIL';

const userSchema = object({
  ...getPartitionKeysSchema(USER),
  ...getGSIKeysSchema(1, getRegex(`${USEREMAIL}_${ulidRegexStr}`), getRegex(`${USEREMAIL}_${ulidRegexStr}`)),
  userId: string().required(),
  teacherId: string().required(),
  userName: string().required(),
  userLastName: string().required(),
  userEmail: string().email()
  // PENDIENTE COLOCAR <ARRAY>OBJECT userUSEREMAILs
});

export { USER, USEREMAIL };

export default userSchema;
