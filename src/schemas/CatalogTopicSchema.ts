import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogTopicSchema = object({
  ...partitionKeysSchema,
  catalogTopicId: string().required(),
  catalogUnitId: string().required(),
  catalogTopicName: string().required()
});

export default catalogTopicSchema;
