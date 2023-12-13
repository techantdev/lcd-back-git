import { object, string } from 'yup';

const catalogUnitSchema = object({
  catalogUnitId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogUnitName: string().required()
});

export default catalogUnitSchema;
