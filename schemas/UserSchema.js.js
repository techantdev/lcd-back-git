import { object, string } from 'yup';

const userSchema = object({
  userId: string().required(),
  teacherId: string().required(),
  userName: string().required(),
  userLastName: string().required(),
  userEmail: string().email()
  // PENDIENTE COLOCAR <ARRAY>OBJECT userSchools
});

module.exports = userSchema;
