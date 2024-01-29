import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENTINDICATOR = 'CATALOGACHIEVEMENTINDICATOR';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementIndicatorSchemaRaw = object({
  catalogAchievementIndicatorId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementIndicatorName: string().required()
});

const catalogAchievementIndicatorSchemaDB = catalogAchievementIndicatorSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGACHIEVEMENTINDICATOR),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENTINDICATOR}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface CatalogAchievementIndicatorRaw extends InferType<typeof catalogAchievementIndicatorSchemaRaw> {}
interface CatalogAchievementIndicatorDB extends InferType<typeof catalogAchievementIndicatorSchemaDB> {}

export {
  CATALOGACHIEVEMENTINDICATOR,
  CATALOGSUBJECT,
  CATALOGGRADE,
  CatalogAchievementIndicatorRaw,
  CatalogAchievementIndicatorDB,
  catalogAchievementIndicatorSchemaRaw,
  catalogAchievementIndicatorSchemaDB
};
