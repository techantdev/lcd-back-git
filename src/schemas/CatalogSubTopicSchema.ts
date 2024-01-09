import { object, string } from 'yup';

import { getPartitionKeysSchema, getGSIKeysSchema, ulidRegexStr, getRegex } from './schemaUtils';

const CATALOGSUBTOPIC = 'CATALOGSUBTOPIC';
const CATALOGTOPIC = 'CATALOGTOPIC';

const catalogSubTopicSchema = object({
  ...getPartitionKeysSchema(CATALOGSUBTOPIC),
  ...getGSIKeysSchema(1, getRegex(`${CATALOGTOPIC}_${ulidRegexStr}`), getRegex(`${CATALOGSUBTOPIC}_${ulidRegexStr}`)),
  catalogSubTopicId: string().required(),
  catalogTopicId: string().required(),
  catalogSubTopicName: string().required()
});

export { CATALOGSUBTOPIC, CATALOGTOPIC };

export default catalogSubTopicSchema;
