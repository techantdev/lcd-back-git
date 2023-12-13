import { object, string } from 'yup';

const catalogSubjectSchema = object({
  yearSubjectId: string().required(),
  catalogSubjectId: string().required(),
  yearAreaId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT yearSubjectGrades
});

module.exports = catalogSubjectSchema;
