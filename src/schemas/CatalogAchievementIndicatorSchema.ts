import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENTINDICATOR = 'CATALOGACHIEVEMENTINDICATOR';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementIndicatorSchema = object({
  ...getPartitionKeysSchema(CATALOGACHIEVEMENTINDICATOR),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENTINDICATOR}`), getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogAchievementIndicatorId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementIndicatorName: string().required()
});

export { CATALOGACHIEVEMENTINDICATOR , CATALOGSUBJECT , CATALOGGRADE };

export default catalogAchievementIndicatorSchema;
