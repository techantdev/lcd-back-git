import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENTINDICATOR = 'CATALOGACHIEVEMENTINDICATOR';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementIndicatorSchema = object({
  ...getPartitionKeysSchema(CATALOGACHIEVEMENTINDICATOR),
  GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENTINDICATOR}`)),
  GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`)),
  catalogAchievementIndicatorId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementIndicatorName: string().required()
});

interface CatalogAchievementIndicatorface extends InferType<typeof catalogAchievementIndicatorSchema> {}

export { CATALOGACHIEVEMENTINDICATOR , CATALOGSUBJECT , CATALOGGRADE, CatalogAchievementIndicatorface };

export default catalogAchievementIndicatorSchema;
