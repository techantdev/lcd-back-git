import { object, string } from 'yup';

const catalogAchievementIndicatorSchema = object({
  catalogAchievementIndicatorId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementIndicatorName: string().required()
});

module.exports = catalogAchievementIndicatorSchema;
