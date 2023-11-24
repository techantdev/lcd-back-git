import { object, string } from 'yup';

const catalogTopicSchema = object({
  catalogTopicId: string().required(),
  catalogUnitId: string().required(),
  catalogTopicName: string().required()
});

module.exports = catalogTopicSchema;
