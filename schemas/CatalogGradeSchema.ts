import { object, string } from 'yup';

const catalogGradeSchema = object({
  catalogGradeId: string().required(),
  schoolId: string().required(),
  catalogGradeLabel: string().required() 
});

module.exports = catalogGradeSchema;
