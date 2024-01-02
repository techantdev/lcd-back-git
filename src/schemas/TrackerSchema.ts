import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const trackerSchema = object({
  ...partitionKeysSchema,
  trackerId: string().required(),
  courseId: string().required()
  // PENDIENTE COLOCAR <ARRAY>OBJECT trackerRows
});

export default trackerSchema;
