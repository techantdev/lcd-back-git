import { object, string } from 'yup';

const catalogSubTopicSchema = object({
  catalogSubTopicId: string().required(),
  catalogTopicId: string().required(),
  catalogSubTopicName: string().required()
});

export default catalogSubTopicSchema;
