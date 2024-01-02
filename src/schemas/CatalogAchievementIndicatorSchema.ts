import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogAchievementIndicatorSchema = object({
  ...partitionKeysSchema,
  catalogAchievementIndicatorId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementIndicatorName: string().required()
});

export default catalogAchievementIndicatorSchema;
