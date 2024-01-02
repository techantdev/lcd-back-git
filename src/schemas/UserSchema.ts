import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const userSchema = object({
  ...partitionKeysSchema,
  userId: string().required(),
  teacherId: string().required(),
  userName: string().required(),
  userLastName: string().required(),
  userEmail: string().email()
  // PENDIENTE COLOCAR <ARRAY>OBJECT userSchools
});

export default userSchema;
