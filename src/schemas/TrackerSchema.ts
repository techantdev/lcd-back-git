import { object, string, InferType, array } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const TRACKER = 'TRACKER';

const trackerRowsSchema = array()
  .of(
    object({
      catalogAreaId: string().required(),
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
  courseId: string().required(),
  trackerRows: trackerRowsSchema
});

const trackerSchemaDB = trackerSchemaRaw.concat(
  object({
    ...getPartitionKeysSchema(TRACKER)
  })
);

interface TrackerRaw extends InferType<typeof trackerSchemaRaw> {}
interface TrackerDB extends InferType<typeof trackerSchemaDB> {}

export { TRACKER, TrackerRaw, TrackerDB, trackerSchemaRaw, trackerSchemaDB };
