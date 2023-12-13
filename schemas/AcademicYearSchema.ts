import { object, string } from 'yup';

const academicYearSchema = object({
  academicYearId: string().required(),
  schoolId: string().required(),
  year: string().required(),
});

module.exports = academicYearSchema;
