import { object, string } from 'yup';

const catalogAchievementSchema = object({
  catalogAchievementId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementName: string().required()
});

export default catalogAchievementSchema;
