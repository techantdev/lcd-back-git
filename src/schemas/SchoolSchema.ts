import { object, string } from 'yup';

const schoolSchema = object({
  schoolId: string().required(),
  schoolName: string().required()
});

export default schoolSchema;
