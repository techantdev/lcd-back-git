import { object, string } from 'yup';

const catalogSubjectSchema = object({
  catalogSubjectId: string().required(),
  catalogAreaId: string().required(),
  catalogSubjectName: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT catalogSubjectGrades
});

export default catalogSubjectSchema;
