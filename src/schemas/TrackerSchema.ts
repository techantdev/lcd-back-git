import { object, string, InferType } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';
import { TrackerSchema } from './schemasIndex';

const TRACKER = 'TRACKER';

const trackerSchema = object({
  ...getPartitionKeysSchema(TRACKER),
  trackerId: string().required(),
  courseId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT trackerRows
});

interface TrackerInterface extends InferType<typeof TrackerSchema> {}

export { TRACKER, TrackerInterface };

export default trackerSchema;
