import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENT = 'CATALOGACHIEVEMENT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementSchema = object({
  ...getPartitionKeysSchema(CATALOGACHIEVEMENT),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENT}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogAchievementId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementName: string().required()
});

interface CatalogAchievementInterface extends InferType<typeof catalogAchievementSchema> {}

export { CATALOGACHIEVEMENT, CATALOGSUBJECT, CATALOGGRADE, CatalogAchievementInterface };

export default catalogAchievementSchema;
