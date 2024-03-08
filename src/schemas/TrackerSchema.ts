import { object, string, InferType, array, number } from 'yup';

import { getGSIKeySchema, getPartitionKeysSchema, getRegex, ulidRegexStr } from './schemaUtils';

const TRACKER = 'TRACKER';
const ACADEMICYEAR = 'ACADEMICYEAR';
const YEARGRADE = 'YEARGRADE';

const trackerRowsSchema = array()
  .of(
    object({
      trackerRowIndex: number().required(),
      // trackerRowId: string().required(),
      trackerRowWeekNumber: string().required(),
      trackerRowStartDate: string().required(),
      trackerRowEndDate: string().required(),
      trackerRowCatalogUnitId: string().required(),
      trackerRowCatalogTopicId: string().required(),
      trackerRowCatalogAchievementId: string().required(),
      trackerRowCatalogAchievementIndicatorId: string().required(),
      trackerRowActivity: string().required(),
      trackerRowStatus: string().required(),
      trackerRowSustainableDevelopmentGoal: string().required()
    })
  )
  .required();

const trackerSchemaRaw = object({
  trackerId: string().required(),
  courseId: string(),
  trackerRows: trackerRowsSchema,
  trackerCompletenessPercentage: number().required().min(0).max(100),
  catalogSubjectId: string().required(),
  catalogGradeId: string().required(),
  academicYearId: string().required(),
  yearGradeId: string().required()
});

const trackerSchemaDB = trackerSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(TRACKER),
    GSI1PK: getGSIKeySchema(getRegex(`${ACADEMICYEAR}_${ulidRegexStr}_${TRACKER}`)),
    GSI1SK: getGSIKeySchema(getRegex(`${YEARGRADE}_${ulidRegexStr}`))
  })
);

interface TrackerRaw extends InferType<typeof trackerSchemaRaw> {}
interface TrackerDB extends InferType<typeof trackerSchemaDB> {}
interface TrackerRows extends InferType<typeof trackerRowsSchema> {}

export { TRACKER, TrackerRaw, TrackerDB, trackerSchemaRaw, trackerSchemaDB, TrackerRows };
