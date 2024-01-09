import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENT = 'CATALOGACHIEVEMENT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementSchema = object({
  ...getPartitionKeysSchema(CATALOGACHIEVEMENT),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENT}`), getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogAchievementId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementName: string().required()
});

export { CATALOGACHIEVEMENT , CATALOGSUBJECT , CATALOGGRADE };

export default catalogAchievementSchema;
