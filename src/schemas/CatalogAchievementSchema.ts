import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema, getGSIKeySchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGACHIEVEMENT = 'CATALOGACHIEVEMENT';
const CATALOGSUBJECT = 'CATALOGSUBJECT';
const CATALOGGRADE = 'CATALOGGRADE';

const catalogAchievementSchemaRaw = object({
  catalogAchievementId: string().required(),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  catalogAchievementName: string().required()
});

const catalogAchievementSchemaDB = catalogAchievementSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(CATALOGACHIEVEMENT),
    GSI1PK: getGSIKeySchema(getRegex(`${CATALOGSUBJECT}_${ulidRegexStr}_${CATALOGACHIEVEMENT}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${CATALOGGRADE}_${ulidRegexStr}`))
  })
);

interface CatalogAchievementRaw extends InferType<typeof catalogAchievementSchemaRaw> {}
interface CatalogAchievementDB extends InferType<typeof catalogAchievementSchemaDB> {}

export {
  CATALOGACHIEVEMENT,
  CATALOGSUBJECT,
  CATALOGGRADE,
  CatalogAchievementRaw,
  CatalogAchievementDB,
  catalogAchievementSchemaRaw,
  catalogAchievementSchemaDB
};
