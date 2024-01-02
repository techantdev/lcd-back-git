import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogAchievementSchema = object({
  ...partitionKeysSchema,
  catalogAchievementId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementName: string().required()
});

export default catalogAchievementSchema;
