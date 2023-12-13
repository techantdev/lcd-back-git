import { object, string } from 'yup';

const schoolSchema = object({
  schoolId: string().required(),
  schoolName: string().required()
});

module.exports = schoolSchema;
