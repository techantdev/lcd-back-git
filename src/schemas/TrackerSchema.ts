import { object, string } from 'yup';

import { getPartitionKeysSchema } from './schemaUtils';

const TRACKER = 'TRACKER';

const trackerSchema = object({
  ...getPartitionKeysSchema(TRACKER),
  trackerId: string().required(),
  courseId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT trackerRows
});

export { TRACKER };

export default trackerSchema;
