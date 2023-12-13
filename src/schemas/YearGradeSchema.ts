import { object, string } from 'yup';

const yearGradeSchema = object({
  yearGradeId: string().required(),
  academicYearId: string().required(),
  catalogGradeId: string().required()
});

export default yearGradeSchema;
