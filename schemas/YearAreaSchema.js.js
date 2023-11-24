import { object, string } from 'yup';

const yearAreaSchema = object({
  yearAreaId: string().required(),
  catalogAreaId: string().required(),
  academicYearId: string().required()
});

module.exports = yearAreaSchema;
