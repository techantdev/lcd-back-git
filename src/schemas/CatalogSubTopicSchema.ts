import { object, string } from 'yup';
import { partitionKeysSchema } from './schemaUtils';

const catalogSubTopicSchema = object({
  ...partitionKeysSchema,
  catalogSubTopicId: string().required(),
  catalogTopicId: string().required(),
  catalogSubTopicName: string().required()
});

export default catalogSubTopicSchema;
